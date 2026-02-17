package com.backend.sudexpert.repository;

import com.backend.sudexpert.domain.*;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;

import java.math.BigDecimal;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@DataJpaTest
class OrderRepositoryTest {

    @Autowired
    private TestEntityManager entityManager;

    @Autowired
    private OrderRepository orderRepository;

    private User testUser;
    private Product testProduct;

    @BeforeEach
    void setUp() {
        testUser = User.builder()
                .email("test@example.com")
                .password("password")
                .firstName("John")
                .lastName("Doe")
                .role(Role.USER)
                .build();
        entityManager.persist(testUser);

        Category category = Category.builder()
                .name("Test Category")
                .build();
        entityManager.persist(category);

        testProduct = Product.builder()
                .name("Test Product")
                .price(new BigDecimal("100.00"))
                .stock(10)
                .category(category)
                .build();
        entityManager.persist(testProduct);

        entityManager.flush();
    }

    @Test
    void findByUserId_ShouldReturnUserOrders() {
        Order order1 = Order.builder()
                .user(testUser)
                .total(new BigDecimal("200.00"))
                .status(OrderStatus.PENDING)
                .orderCode("ORD-20231211-0001")
                .build();

        Order order2 = Order.builder()
                .user(testUser)
                .total(new BigDecimal("300.00"))
                .status(OrderStatus.PROCESSING)
                .orderCode("ORD-20231211-0002")
                .build();

        entityManager.persist(order1);
        entityManager.persist(order2);
        entityManager.flush();

        List<Order> orders = orderRepository.findByUserId(testUser.getId());

        assertNotNull(orders);
        assertEquals(2, orders.size());
        assertTrue(orders.stream().allMatch(o -> o.getUser().getId().equals(testUser.getId())));
    }

    @Test
    void findByUserId_WhenNoOrders_ShouldReturnEmptyList() {
        List<Order> orders = orderRepository.findByUserId(testUser.getId());

        assertNotNull(orders);
        assertTrue(orders.isEmpty());
    }

    @Test
    void save_ShouldPersistOrder() {
        Order order = Order.builder()
                .user(testUser)
                .total(new BigDecimal("500.00"))
                .status(OrderStatus.PENDING)
                .orderCode("ORD-20231211-0003")
                .build();

        Order savedOrder = orderRepository.save(order);

        assertNotNull(savedOrder.getId());
        assertEquals(testUser.getId(), savedOrder.getUser().getId());
        assertEquals(new BigDecimal("500.00"), savedOrder.getTotal());
        assertEquals(OrderStatus.PENDING, savedOrder.getStatus());
    }

    @Test
    void save_WithOrderItems_ShouldPersistOrderAndItems() {
        Order order = Order.builder()
                .user(testUser)
                .total(new BigDecimal("200.00"))
                .status(OrderStatus.PENDING)
                .orderCode("ORD-20231211-0004")
                .build();

        OrderItem item = OrderItem.builder()
                .order(order)
                .product(testProduct)
                .quantity(2)
                .price(new BigDecimal("100.00"))
                .build();

        order.setItems(List.of(item));

        Order savedOrder = orderRepository.save(order);

        assertNotNull(savedOrder.getId());
        assertNotNull(savedOrder.getItems());
        assertEquals(1, savedOrder.getItems().size());
        assertEquals(2, savedOrder.getItems().get(0).getQuantity());
    }
}

