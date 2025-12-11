package com.backend.sudexpert.controller;

import com.backend.sudexpert.domain.Order;
import com.backend.sudexpert.dto.OrderRequest;
import com.backend.sudexpert.dto.OrderResponse;
import com.backend.sudexpert.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
public class OrderController {

    private final OrderService service;

    @GetMapping
    public ResponseEntity<List<Order>> getMyOrders(Authentication authentication) {
        return ResponseEntity.ok(service.getOrdersByUser(authentication.getName()));
    }

    @PostMapping
    public ResponseEntity<OrderResponse> createOrder(@RequestBody OrderRequest request, Authentication authentication) {
        return ResponseEntity.ok(service.createOrder(request, authentication.getName()));
    }

    @GetMapping("/{id}")
    public ResponseEntity<OrderResponse> getOrderById(@PathVariable Long id, Authentication authentication) {
        return ResponseEntity.ok(service.getOrderById(id, authentication.getName()));
    }

    @GetMapping("/code/{orderCode}")
    public ResponseEntity<OrderResponse> getOrderByCode(@PathVariable String orderCode, Authentication authentication) {
        return ResponseEntity.ok(service.getOrderByCode(orderCode, authentication.getName()));
    }
}
