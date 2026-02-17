package com.backend.sudexpert.config;

import com.backend.sudexpert.domain.Order;
import com.backend.sudexpert.repository.OrderRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Slf4j
@Component
@RequiredArgsConstructor
public class DatabaseMigration implements CommandLineRunner {

    private final OrderRepository orderRepository;

    @Override
    @Transactional
    public void run(String... args) {
        try {
            migrateOrderCodes();
        } catch (Exception e) {
            log.error("Error during database migration", e);
        }
    }

    private void migrateOrderCodes() {
        log.info("Checking for orders without order codes...");
        
        List<Order> ordersWithoutCode = orderRepository.findAll().stream()
                .filter(order -> order.getOrderCode() == null || order.getOrderCode().isEmpty())
                .toList();

        if (ordersWithoutCode.isEmpty()) {
            log.info("All orders have order codes. No migration needed.");
            return;
        }

        log.info("Found {} orders without order codes. Generating codes...", ordersWithoutCode.size());

        for (Order order : ordersWithoutCode) {
            String orderCode = generateOrderCodeForMigration(order);
            order.setOrderCode(orderCode);
            orderRepository.save(order);
            log.info("Generated order code {} for order ID {}", orderCode, order.getId());
        }

        log.info("Successfully migrated {} orders", ordersWithoutCode.size());
    }

    private String generateOrderCodeForMigration(Order order) {
        LocalDateTime dateTime = order.getCreatedAt() != null ? order.getCreatedAt() : LocalDateTime.now();
        String datePart = dateTime.format(DateTimeFormatter.ofPattern("yyyyMMdd"));
        String sequencePart = String.format("%04d", order.getId());
        
        return "ORD-" + datePart + "-" + sequencePart;
    }
}

