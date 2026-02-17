package com.backend.sudexpert.service;

import com.backend.sudexpert.domain.*;
import com.backend.sudexpert.dto.OrderRequest;
import com.backend.sudexpert.dto.OrderResponse;
import com.backend.sudexpert.repository.OrderRepository;
import com.backend.sudexpert.repository.ProductRepository;
import com.backend.sudexpert.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class OrderServiceTest {

    @Mock
    private OrderRepository orderRepository;

    @Mock
    private UserRepository userRepository;

    @Mock
    private ProductRepository productRepository;

    @InjectMocks
    private OrderService orderService;

    private User testUser;
    private Order testOrder;
    private Product testProduct;

    @BeforeEach
    void setUp() {
        testUser = User.builder()
                .id(1L)
                .email("test@example.com")
                .password("password")
                .firstName("John")
                .lastName("Doe")
                .role(Role.USER)
                .build();

        testProduct = Product.builder()
                .id(1L)
                .name("Electrozi E6013")
                .price(new BigDecimal("150.00"))
                .build();

        OrderItem orderItem = OrderItem.builder()
                .id(1L)
                .product(testProduct)
                .quantity(2)
                .price(new BigDecimal("150.00"))
                .build();

        testOrder = Order.builder()
                .id(1L)
                .user(testUser)
                .items(Arrays.asList(orderItem))
                .total(new BigDecimal("300.00"))
                .status(OrderStatus.PENDING)
                .orderCode("ORD-20231211-0001")
                .build();
    }

    @Test
    void getOrdersByUser_WhenUserExists_ShouldReturnOrders() {
        when(userRepository.findByEmail("test@example.com")).thenReturn(Optional.of(testUser));
        when(orderRepository.findByUserId(1L)).thenReturn(Arrays.asList(testOrder));

        List<Order> orders = orderService.getOrdersByUser("test@example.com");

        assertNotNull(orders);
        assertEquals(1, orders.size());
        assertEquals(testOrder.getId(), orders.get(0).getId());
        verify(userRepository, times(1)).findByEmail("test@example.com");
        verify(orderRepository, times(1)).findByUserId(1L);
    }

    @Test
    void getOrdersByUser_WhenUserDoesNotExist_ShouldThrowException() {
        when(userRepository.findByEmail("nonexistent@example.com")).thenReturn(Optional.empty());

        RuntimeException exception = assertThrows(RuntimeException.class, () -> {
            orderService.getOrdersByUser("nonexistent@example.com");
        });
        assertEquals("User not found", exception.getMessage());
        verify(userRepository, times(1)).findByEmail("nonexistent@example.com");
        verify(orderRepository, never()).findByUserId(any());
    }

    @Test
    void createOrder_WhenUserExists_ShouldCreateOrderWithPendingStatus() {
        OrderRequest orderRequest = OrderRequest.builder()
                .items(Arrays.asList(
                        OrderRequest.OrderItemRequest.builder()
                                .product(OrderRequest.ProductReference.builder().id(1L).build())
                                .quantity(2)
                                .price(new BigDecimal("150.00"))
                                .build()
                ))
                .total(new BigDecimal("300.00"))
                .deliveryName("John Doe")
                .deliveryEmail("test@example.com")
                .deliveryPhone("0712345678")
                .deliveryAddress("Strada Test 123")
                .deliveryCity("București")
                .deliveryCountry("Romania")
                .build();

        when(userRepository.findByEmail("test@example.com")).thenReturn(Optional.of(testUser));
        when(productRepository.findById(1L)).thenReturn(Optional.of(testProduct));
        when(orderRepository.save(any(Order.class))).thenReturn(testOrder);
        when(orderRepository.findAll()).thenReturn(Arrays.asList()); // For order code generation

        OrderResponse createdOrder = orderService.createOrder(orderRequest, "test@example.com");

        assertNotNull(createdOrder);
        assertEquals(testOrder.getTotal(), createdOrder.getTotal());
        assertEquals(OrderStatus.PENDING, createdOrder.getStatus());
        assertNotNull(createdOrder.getOrderCode());
        verify(userRepository, times(1)).findByEmail("test@example.com");
        verify(productRepository, times(1)).findById(1L);
        verify(orderRepository, times(1)).save(any(Order.class));
    }

    @Test
    void createOrder_WhenUserDoesNotExist_ShouldThrowException() {
        OrderRequest orderRequest = OrderRequest.builder()
                .items(Arrays.asList(
                        OrderRequest.OrderItemRequest.builder()
                                .product(OrderRequest.ProductReference.builder().id(1L).build())
                                .quantity(2)
                                .price(new BigDecimal("150.00"))
                                .build()
                ))
                .total(new BigDecimal("300.00"))
                .build();

        when(userRepository.findByEmail("nonexistent@example.com")).thenReturn(Optional.empty());

        RuntimeException exception = assertThrows(RuntimeException.class, () -> {
            orderService.createOrder(orderRequest, "nonexistent@example.com");
        });
        assertEquals("User not found", exception.getMessage());
        verify(userRepository, times(1)).findByEmail("nonexistent@example.com");
        verify(orderRepository, never()).save(any());
    }

    @Test
    void createOrder_ShouldSetUserAndStatus() {
        OrderRequest orderRequest = OrderRequest.builder()
                .items(Arrays.asList(
                        OrderRequest.OrderItemRequest.builder()
                                .product(OrderRequest.ProductReference.builder().id(1L).build())
                                .quantity(3)
                                .price(new BigDecimal("200.00"))
                                .build()
                ))
                .total(new BigDecimal("600.00"))
                .deliveryName("John Doe")
                .deliveryEmail("test@example.com")
                .deliveryPhone("0712345678")
                .deliveryAddress("Strada Test 123")
                .deliveryCity("București")
                .deliveryCountry("Romania")
                .build();

        when(userRepository.findByEmail("test@example.com")).thenReturn(Optional.of(testUser));
        when(productRepository.findById(1L)).thenReturn(Optional.of(testProduct));
        when(orderRepository.findAll()).thenReturn(Arrays.asList());
        when(orderRepository.save(any(Order.class))).thenAnswer(invocation -> {
            Order order = invocation.getArgument(0);
            order.setId(1L);
            return order;
        });

        OrderResponse createdOrder = orderService.createOrder(orderRequest, "test@example.com");

        assertNotNull(createdOrder);
        assertEquals(new BigDecimal("600.00"), createdOrder.getTotal());
        assertEquals(OrderStatus.PENDING, createdOrder.getStatus());
        assertNotNull(createdOrder.getOrderCode());
    }
}

