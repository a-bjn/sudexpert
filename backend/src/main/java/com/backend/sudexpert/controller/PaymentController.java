package com.backend.sudexpert.controller;

import com.backend.sudexpert.dto.PaymentIntentRequest;
import com.backend.sudexpert.dto.PaymentIntentResponse;
import com.backend.sudexpert.service.StripeService;
import com.stripe.exception.StripeException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/payments")
@RequiredArgsConstructor
public class PaymentController {

    private final StripeService stripeService;

    @PostMapping("/create-payment-intent")
    public ResponseEntity<PaymentIntentResponse> createPaymentIntent(
            @RequestBody PaymentIntentRequest request) {
        try {
            PaymentIntentResponse response = stripeService.createPaymentIntent(request);
            return ResponseEntity.ok(response);
        } catch (StripeException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PostMapping("/webhook")
    public ResponseEntity<String> handleStripeWebhook(
            @RequestBody String payload,
            @RequestHeader("Stripe-Signature") String sigHeader) {
        return ResponseEntity.ok("Received");
    }

    @PostMapping("/success")
    public ResponseEntity<Void> handlePaymentSuccess(@RequestParam String paymentIntentId) {
        stripeService.handlePaymentSuccess(paymentIntentId);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/failure")
    public ResponseEntity<Void> handlePaymentFailure(@RequestParam String paymentIntentId) {
        stripeService.handlePaymentFailure(paymentIntentId);
        return ResponseEntity.ok().build();
    }
}

