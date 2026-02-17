package com.backend.sudexpert.controller;

import com.backend.sudexpert.config.JwtService;
import com.backend.sudexpert.domain.Category;
import com.backend.sudexpert.domain.Product;
import com.backend.sudexpert.service.ProductService;
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
import java.util.Arrays;
import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.*;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(ProductController.class)
class ProductControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    private ProductService productService;

    @MockBean
    private JwtService jwtService;

    private Product testProduct;
    private Category testCategory;

    @BeforeEach
    void setUp() {
        testCategory = Category.builder()
                .id(1L)
                .name("Electrozi")
                .build();

        testProduct = Product.builder()
                .id(1L)
                .name("Electrozi E6013")
                .description("Electrozi de calitate superioară")
                .price(new BigDecimal("150.00"))
                .stock(100)
                .imageUrl("http://example.com/image.jpg")
                .category(testCategory)
                .build();
    }

    @Test
    @WithMockUser
    void getAllProducts_ShouldReturnProductList() throws Exception {
        Product product2 = Product.builder()
                .id(2L)
                .name("Sârmă sudură")
                .price(new BigDecimal("200.00"))
                .build();
        List<Product> products = Arrays.asList(testProduct, product2);
        when(productService.getAllProducts()).thenReturn(products);

        mockMvc.perform(get("/api/products"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$").isArray())
                .andExpect(jsonPath("$.length()").value(2))
                .andExpect(jsonPath("$[0].id").value(1))
                .andExpect(jsonPath("$[0].name").value("Electrozi E6013"))
                .andExpect(jsonPath("$[0].price").value(150.00))
                .andExpect(jsonPath("$[1].id").value(2));

        verify(productService, times(1)).getAllProducts();
    }

    @Test
    @WithMockUser
    void getProductById_WhenProductExists_ShouldReturnProduct() throws Exception {
        when(productService.getProductById(1L)).thenReturn(testProduct);

        mockMvc.perform(get("/api/products/1"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.id").value(1))
                .andExpect(jsonPath("$.name").value("Electrozi E6013"))
                .andExpect(jsonPath("$.description").value("Electrozi de calitate superioară"))
                .andExpect(jsonPath("$.price").value(150.00))
                .andExpect(jsonPath("$.stock").value(100));

        verify(productService, times(1)).getProductById(1L);
    }

    @Test
    @WithMockUser
    void getProductById_WhenProductDoesNotExist_ShouldThrowException() throws Exception {
        when(productService.getProductById(999L)).thenThrow(new RuntimeException("Product not found"));

        try {
            mockMvc.perform(get("/api/products/999"));
            throw new AssertionError("Expected RuntimeException to be thrown");
        } catch (Exception e) {
            assert e.getCause() != null;
            assert e.getCause().getMessage().contains("Product not found");
        }

        verify(productService, times(1)).getProductById(999L);
    }

    @Test
    @WithMockUser
    void createProduct_ShouldReturnCreatedProduct() throws Exception {
        Product newProduct = Product.builder()
                .name("New Product")
                .price(new BigDecimal("100.00"))
                .build();

        Product savedProduct = Product.builder()
                .id(3L)
                .name("New Product")
                .price(new BigDecimal("100.00"))
                .build();

        when(productService.createProduct(any(Product.class))).thenReturn(savedProduct);

        mockMvc.perform(post("/api/products")
                        .with(csrf())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(newProduct)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(3))
                .andExpect(jsonPath("$.name").value("New Product"))
                .andExpect(jsonPath("$.price").value(100.00));

        verify(productService, times(1)).createProduct(any(Product.class));
    }

    @Test
    @WithMockUser
    void getProductsByCategory_ShouldReturnProductsInCategory() throws Exception {
        Product product2 = Product.builder()
                .id(2L)
                .name("Electrozi E7018")
                .category(testCategory)
                .price(new BigDecimal("180.00"))
                .build();
        List<Product> products = Arrays.asList(testProduct, product2);
        when(productService.getProductsByCategory(1L)).thenReturn(products);

        mockMvc.perform(get("/api/products/category/1"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$").isArray())
                .andExpect(jsonPath("$.length()").value(2))
                .andExpect(jsonPath("$[0].name").value("Electrozi E6013"))
                .andExpect(jsonPath("$[1].name").value("Electrozi E7018"));

        verify(productService, times(1)).getProductsByCategory(1L);
    }
}

