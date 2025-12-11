package com.backend.sudexpert.controller;

import com.backend.sudexpert.config.JwtService;
import com.backend.sudexpert.domain.*;
import com.backend.sudexpert.dto.OrderRequest;
import com.backend.sudexpert.dto.OrderResponse;
import com.backend.sudexpert.service.OrderService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.*;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(OrderController.class)
class OrderControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    private OrderService orderService;

    @MockBean
    private JwtService jwtService;

    private Order testOrder;
    private OrderResponse testOrderResponse;
    private User testUser;

    @BeforeEach
    void setUp() {
        testUser = User.builder()
                .id(1L)
                .email("test@example.com")
                .firstName("John")
                .lastName("Doe")
                .role(Role.USER)
                .build();

        Product testProduct = Product.builder()
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

        testOrderResponse = OrderResponse.builder()
                .id(1L)
                .orderCode("ORD-20231211-0001")
                .total(new BigDecimal("300.00"))
                .status(OrderStatus.PENDING)
                .createdAt(LocalDateTime.now())
                .items(Arrays.asList(
                        OrderResponse.OrderItemResponse.builder()
                                .id(1L)
                                .productName("Electrozi E6013")
                                .quantity(2)
                                .price(new BigDecimal("150.00"))
                                .subtotal(new BigDecimal("300.00"))
                                .build()
                ))
                .build();
    }

    @Test
    @WithMockUser(username = "test@example.com")
    void getMyOrders_ShouldReturnUserOrders() throws Exception {
        // Arrange
        List<Order> orders = Arrays.asList(testOrder);
        when(orderService.getOrdersByUser("test@example.com")).thenReturn(orders);

        // Act & Assert
        mockMvc.perform(get("/api/orders"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$").isArray())
                .andExpect(jsonPath("$.length()").value(1))
                .andExpect(jsonPath("$[0].id").value(1))
                .andExpect(jsonPath("$[0].total").value(300.00))
                .andExpect(jsonPath("$[0].status").value("PENDING"));

        verify(orderService, times(1)).getOrdersByUser("test@example.com");
    }

    @Test
    @WithMockUser(username = "test@example.com")
    void createOrder_ShouldReturnCreatedOrder() throws Exception {
        // Arrange
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
                .deliveryPostalCode("010101")
                .deliveryCountry("Romania")
                .build();

        when(orderService.createOrder(any(OrderRequest.class), eq("test@example.com")))
                .thenReturn(testOrderResponse);

        // Act & Assert
        mockMvc.perform(post("/api/orders")
                        .with(csrf())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(orderRequest)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1))
                .andExpect(jsonPath("$.orderCode").value("ORD-20231211-0001"))
                .andExpect(jsonPath("$.total").value(300.00))
                .andExpect(jsonPath("$.status").value("PENDING"));

        verify(orderService, times(1)).createOrder(any(OrderRequest.class), eq("test@example.com"));
    }
}

