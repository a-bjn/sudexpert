package com.backend.sudexpert.service;

import com.backend.sudexpert.domain.Order;
import com.backend.sudexpert.domain.OrderStatus;
import com.backend.sudexpert.dto.PaymentIntentRequest;
import com.backend.sudexpert.dto.PaymentIntentResponse;
import com.backend.sudexpert.repository.OrderRepository;
import com.stripe.exception.SignatureVerificationException;
import com.stripe.exception.StripeException;
import com.stripe.model.Event;
import com.stripe.model.PaymentIntent;
import com.stripe.net.Webhook;
import com.stripe.param.PaymentIntentCreateParams;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;

@Service
@Slf4j
public class StripeService {

    private final OrderRepository orderRepository;
    private final OrderService orderService;
    private final EmailService emailService;

    @Value("${stripe.webhook.secret:}")
    private String webhookSecret;

    public StripeService(OrderRepository orderRepository, OrderService orderService, EmailService emailService) {
        this.orderRepository = orderRepository;
        this.orderService = orderService;
        this.emailService = emailService;
    }

    public PaymentIntentResponse createPaymentIntent(PaymentIntentRequest request, String userEmail) throws StripeException {
        if (request.getOrderId() == null) {
            throw new IllegalArgumentException("Order ID is required");
        }
        Order order = orderRepository.findById(request.getOrderId())
                .orElseThrow(() -> new IllegalArgumentException("Order not found"));
        if (!order.getUser().getEmail().equals(userEmail)) {
            throw new IllegalArgumentException("Order does not belong to user");
        }
        if (order.getStatus() != OrderStatus.PENDING) {
            throw new IllegalArgumentException("Order is not in PENDING status");
        }

        long amountInCents = order.getTotal().multiply(new BigDecimal("100")).longValue();
        String currency = request.getCurrency() != null && !request.getCurrency().isBlank()
                ? request.getCurrency() : "ron";

        PaymentIntentCreateParams params = PaymentIntentCreateParams.builder()
                .setAmount(amountInCents)
                .setCurrency(currency)
                .putMetadata("orderId", order.getId().toString())
                .setAutomaticPaymentMethods(
                        PaymentIntentCreateParams.AutomaticPaymentMethods.builder()
                                .setEnabled(true)
                                .build()
                )
                .build();

        PaymentIntent paymentIntent = PaymentIntent.create(params);

        log.info("Created payment intent: {} for order {} amount: {} {}", 
                paymentIntent.getId(), order.getOrderCode(), order.getTotal(), currency);

        return PaymentIntentResponse.builder()
                .clientSecret(paymentIntent.getClientSecret())
                .paymentIntentId(paymentIntent.getId())
                .build();
    }

    public void handlePaymentSuccess(String paymentIntentId, String userEmail) {
        PaymentIntent paymentIntent;
        try {
            paymentIntent = PaymentIntent.retrieve(paymentIntentId);
        } catch (StripeException e) {
            log.error("Failed to retrieve payment intent: {}", e.getMessage());
            throw new IllegalArgumentException("Invalid payment intent");
        }
        if (!"succeeded".equals(paymentIntent.getStatus())) {
            throw new IllegalArgumentException("Payment has not succeeded");
        }
        String orderIdStr = paymentIntent.getMetadata().get("orderId");
        if (orderIdStr == null) {
            throw new IllegalArgumentException("Payment intent has no order");
        }
        Long orderId = Long.parseLong(orderIdStr);
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new IllegalArgumentException("Order not found"));
        if (!order.getUser().getEmail().equals(userEmail)) {
            throw new IllegalArgumentException("Order does not belong to user");
        }

        order.setStatus(OrderStatus.PROCESSING);
        orderRepository.save(order);
        log.info("Order {} marked as PROCESSING after successful payment", orderId);

        try {
            com.backend.sudexpert.dto.OrderResponse orderResponse =
                    orderService.getOrderById(orderId, order.getUser().getEmail());
            emailService.sendOrderConfirmationEmail(orderResponse);
        } catch (Exception emailError) {
            log.error("Failed to send confirmation email for order {}: {}", orderId, emailError.getMessage());
        }
    }

    public void handlePaymentFailure(String paymentIntentId, String userEmail) {
        PaymentIntent paymentIntent;
        try {
            paymentIntent = PaymentIntent.retrieve(paymentIntentId);
        } catch (StripeException e) {
            log.error("Failed to retrieve payment intent: {}", e.getMessage());
            throw new IllegalArgumentException("Invalid payment intent");
        }
        String status = paymentIntent.getStatus();
        if (!"requires_payment_method".equals(status) && !"canceled".equals(status)) {
            throw new IllegalArgumentException("Payment status does not indicate failure");
        }
        String orderIdStr = paymentIntent.getMetadata().get("orderId");
        if (orderIdStr == null) {
            throw new IllegalArgumentException("Payment intent has no order");
        }
        Long orderId = Long.parseLong(orderIdStr);
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new IllegalArgumentException("Order not found"));
        if (!order.getUser().getEmail().equals(userEmail)) {
            throw new IllegalArgumentException("Order does not belong to user");
        }

        order.setStatus(OrderStatus.CANCELLED);
        orderRepository.save(order);
        log.info("Order {} marked as CANCELLED after payment failure", orderId);
    }

    /**
     * Process webhook event from Stripe. Verifies signature before processing.
     */
    public void processWebhookEvent(String payload, String sigHeader) {
        if (webhookSecret == null || webhookSecret.isBlank()) {
            log.warn("Stripe webhook secret not configured - skipping signature verification");
            return;
        }
        if (sigHeader == null || sigHeader.isBlank()) {
            throw new IllegalArgumentException("Missing Stripe-Signature header");
        }
        Event event;
        try {
            event = Webhook.constructEvent(payload, sigHeader, webhookSecret);
        } catch (SignatureVerificationException e) {
            log.error("Invalid Stripe webhook signature: {}", e.getMessage());
            throw new IllegalArgumentException("Invalid webhook signature");
        }
        String type = event.getType();
        Object dataObject = event.getDataObjectDeserializer().getObject().orElse(null);
        if (dataObject == null) {
            log.warn("Webhook event {} has no data object", type);
            return;
        }
        if ("payment_intent.succeeded".equals(type) && dataObject instanceof PaymentIntent pi) {
            processPaymentSuccessFromWebhook(pi);
        } else if ("payment_intent.payment_failed".equals(type) && dataObject instanceof PaymentIntent pi) {
            processPaymentFailureFromWebhook(pi);
        } else {
            log.debug("Unhandled webhook event type: {}", type);
        }
    }

    private void processPaymentSuccessFromWebhook(PaymentIntent paymentIntent) {
        String orderIdStr = paymentIntent.getMetadata().get("orderId");
        if (orderIdStr == null) return;
        try {
            Long orderId = Long.parseLong(orderIdStr);
            Order order = orderRepository.findById(orderId).orElse(null);
            if (order == null) return;
            order.setStatus(OrderStatus.PROCESSING);
            orderRepository.save(order);
            log.info("Order {} marked as PROCESSING via webhook", orderId);
            try {
                var orderResponse = orderService.getOrderById(orderId, order.getUser().getEmail());
                emailService.sendOrderConfirmationEmail(orderResponse);
            } catch (Exception e) {
                log.error("Failed to send confirmation email for order {}: {}", orderId, e.getMessage());
            }
        } catch (Exception e) {
            log.error("Error processing webhook payment success: {}", e.getMessage());
        }
    }

    private void processPaymentFailureFromWebhook(PaymentIntent paymentIntent) {
        String orderIdStr = paymentIntent.getMetadata().get("orderId");
        if (orderIdStr == null) return;
        try {
            Long orderId = Long.parseLong(orderIdStr);
            Order order = orderRepository.findById(orderId).orElse(null);
            if (order == null) return;
            order.setStatus(OrderStatus.CANCELLED);
            orderRepository.save(order);
            log.info("Order {} marked as CANCELLED via webhook", orderId);
        } catch (Exception e) {
            log.error("Error processing webhook payment failure: {}", e.getMessage());
        }
    }
}

