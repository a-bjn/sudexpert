package com.backend.sudexpert.controller;

import com.backend.sudexpert.dto.PaymentIntentRequest;
import com.backend.sudexpert.dto.PaymentIntentResponse;
import com.backend.sudexpert.service.StripeService;
import com.stripe.exception.StripeException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/payments")
@RequiredArgsConstructor
public class PaymentController {

    private final StripeService stripeService;

    @PostMapping("/create-payment-intent")
    public ResponseEntity<PaymentIntentResponse> createPaymentIntent(
            @Valid @RequestBody PaymentIntentRequest request,
            Authentication authentication) {
        try {
            PaymentIntentResponse response = stripeService.createPaymentIntent(request, authentication.getName());
            return ResponseEntity.ok(response);
        } catch (StripeException e) {
            return ResponseEntity.badRequest().build();
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PostMapping("/webhook")
    public ResponseEntity<String> handleStripeWebhook(
            @RequestBody String payload,
            @RequestHeader(value = "Stripe-Signature", required = false) String sigHeader) {
        try {
            stripeService.processWebhookEvent(payload, sigHeader);
            return ResponseEntity.ok("Received");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PostMapping("/success")
    public ResponseEntity<Void> handlePaymentSuccess(
            @RequestParam String paymentIntentId,
            Authentication authentication) {
        try {
            stripeService.handlePaymentSuccess(paymentIntentId, authentication.getName());
            return ResponseEntity.ok().build();
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PostMapping("/failure")
    public ResponseEntity<Void> handlePaymentFailure(
            @RequestParam String paymentIntentId,
            Authentication authentication) {
        try {
            stripeService.handlePaymentFailure(paymentIntentId, authentication.getName());
            return ResponseEntity.ok().build();
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        }
    }
}

