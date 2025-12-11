package com.backend.sudexpert.service;

import com.backend.sudexpert.domain.Order;
import com.backend.sudexpert.domain.OrderItem;
import com.backend.sudexpert.domain.OrderStatus;
import com.backend.sudexpert.domain.Product;
import com.backend.sudexpert.domain.User;
import com.backend.sudexpert.dto.OrderRequest;
import com.backend.sudexpert.dto.OrderResponse;
import com.backend.sudexpert.repository.OrderRepository;
import com.backend.sudexpert.repository.ProductRepository;
import com.backend.sudexpert.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class OrderService {

    private final OrderRepository repository;
    private final UserRepository userRepository;
    private final ProductRepository productRepository;

    public List<Order> getOrdersByUser(String email) {
        User user = userRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found"));
        return repository.findByUserId(user.getId());
    }

    @Transactional
    public OrderResponse createOrder(OrderRequest request, String email) {
        User user = userRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found"));
        
        // Create order
        Order order = Order.builder()
                .user(user)
                .total(request.getTotal())
                .status(OrderStatus.PENDING)
                .orderCode(generateOrderCode())
                .deliveryName(request.getDeliveryName())
                .deliveryEmail(request.getDeliveryEmail())
                .deliveryPhone(request.getDeliveryPhone())
                .deliveryAddress(request.getDeliveryAddress())
                .deliveryCity(request.getDeliveryCity())
                .deliveryCounty(request.getDeliveryCounty())
                .deliveryPostalCode(request.getDeliveryPostalCode())
                .deliveryCountry(request.getDeliveryCountry())
                .deliveryNotes(request.getDeliveryNotes())
                .build();
        
        // Create order items
        List<OrderItem> orderItems = request.getItems().stream().map(itemRequest -> {
            Product product = productRepository.findById(itemRequest.getProduct().getId())
                    .orElseThrow(() -> new RuntimeException("Product not found"));
            
            return OrderItem.builder()
                    .order(order)
                    .product(product)
                    .quantity(itemRequest.getQuantity())
                    .price(itemRequest.getPrice())
                    .build();
        }).collect(Collectors.toList());
        
        order.setItems(orderItems);
        Order savedOrder = repository.save(order);
        
        log.info("Created order {} for user {}", savedOrder.getOrderCode(), email);
        
        return mapToOrderResponse(savedOrder);
    }

    public OrderResponse getOrderById(Long id, String email) {
        User user = userRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found"));
        Order order = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Order not found"));
        
        if (!order.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("Unauthorized access to order");
        }
        
        return mapToOrderResponse(order);
    }

    public OrderResponse getOrderByCode(String orderCode, String email) {
        User user = userRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found"));
        Order order = repository.findByOrderCode(orderCode)
                .orElseThrow(() -> new RuntimeException("Order not found"));
        
        if (!order.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("Unauthorized access to order");
        }
        
        return mapToOrderResponse(order);
    }

    private String generateOrderCode() {
        // Format: ORD-YYYYMMDD-XXXX (e.g., ORD-20231211-0001)
        String dateStr = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyyMMdd"));
        
        // Find the last order code for today
        String prefix = "ORD-" + dateStr + "-";
        List<Order> todayOrders = repository.findAll().stream()
                .filter(o -> o.getOrderCode() != null && o.getOrderCode().startsWith(prefix))
                .collect(Collectors.toList());
        
        int nextNumber = todayOrders.size() + 1;
        return String.format("%s%04d", prefix, nextNumber);
    }

    private OrderResponse mapToOrderResponse(Order order) {
        List<OrderResponse.OrderItemResponse> itemResponses = order.getItems().stream()
                .map(item -> OrderResponse.OrderItemResponse.builder()
                        .id(item.getId())
                        .productName(item.getProduct().getName())
                        .quantity(item.getQuantity())
                        .price(item.getPrice())
                        .subtotal(item.getPrice().multiply(BigDecimal.valueOf(item.getQuantity())))
                        .build())
                .collect(Collectors.toList());
        
        return OrderResponse.builder()
                .id(order.getId())
                .orderCode(order.getOrderCode())
                .total(order.getTotal())
                .status(order.getStatus())
                .createdAt(order.getCreatedAt())
                .deliveryName(order.getDeliveryName())
                .deliveryEmail(order.getDeliveryEmail())
                .deliveryPhone(order.getDeliveryPhone())
                .deliveryAddress(order.getDeliveryAddress())
                .deliveryCity(order.getDeliveryCity())
                .deliveryCounty(order.getDeliveryCounty())
                .deliveryPostalCode(order.getDeliveryPostalCode())
                .deliveryCountry(order.getDeliveryCountry())
                .deliveryNotes(order.getDeliveryNotes())
                .items(itemResponses)
                .build();
    }
}
