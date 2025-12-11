package com.backend.sudexpert.service;

import com.backend.sudexpert.domain.Category;
import com.backend.sudexpert.domain.Product;
import com.backend.sudexpert.repository.ProductRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class ProductServiceTest {

    @Mock
    private ProductRepository productRepository;

    @InjectMocks
    private ProductService productService;

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
    void getAllProducts_ShouldReturnAllProducts() {
        // Arrange
        Product product2 = Product.builder()
                .id(2L)
                .name("Sârmă sudură")
                .price(new BigDecimal("200.00"))
                .build();
        List<Product> expectedProducts = Arrays.asList(testProduct, product2);
        when(productRepository.findAll()).thenReturn(expectedProducts);

        // Act
        List<Product> actualProducts = productService.getAllProducts();

        // Assert
        assertNotNull(actualProducts);
        assertEquals(2, actualProducts.size());
        assertEquals(expectedProducts, actualProducts);
        verify(productRepository, times(1)).findAll();
    }

    @Test
    void createProduct_ShouldSaveAndReturnProduct() {
        // Arrange
        when(productRepository.save(any(Product.class))).thenReturn(testProduct);

        // Act
        Product savedProduct = productService.createProduct(testProduct);

        // Assert
        assertNotNull(savedProduct);
        assertEquals(testProduct.getName(), savedProduct.getName());
        assertEquals(testProduct.getPrice(), savedProduct.getPrice());
        verify(productRepository, times(1)).save(testProduct);
    }

    @Test
    void getProductById_WhenProductExists_ShouldReturnProduct() {
        // Arrange
        when(productRepository.findById(1L)).thenReturn(Optional.of(testProduct));

        // Act
        Product foundProduct = productService.getProductById(1L);

        // Assert
        assertNotNull(foundProduct);
        assertEquals(testProduct.getId(), foundProduct.getId());
        assertEquals(testProduct.getName(), foundProduct.getName());
        verify(productRepository, times(1)).findById(1L);
    }

    @Test
    void getProductById_WhenProductDoesNotExist_ShouldThrowException() {
        // Arrange
        when(productRepository.findById(999L)).thenReturn(Optional.empty());

        // Act & Assert
        RuntimeException exception = assertThrows(RuntimeException.class, () -> {
            productService.getProductById(999L);
        });
        assertEquals("Product not found", exception.getMessage());
        verify(productRepository, times(1)).findById(999L);
    }

    @Test
    void getProductsByCategory_ShouldReturnProductsInCategory() {
        // Arrange
        Product product2 = Product.builder()
                .id(2L)
                .name("Electrozi E7018")
                .category(testCategory)
                .build();
        List<Product> expectedProducts = Arrays.asList(testProduct, product2);
        when(productRepository.findByCategoryId(1L)).thenReturn(expectedProducts);

        // Act
        List<Product> actualProducts = productService.getProductsByCategory(1L);

        // Assert
        assertNotNull(actualProducts);
        assertEquals(2, actualProducts.size());
        assertTrue(actualProducts.stream().allMatch(p -> p.getCategory().equals(testCategory)));
        verify(productRepository, times(1)).findByCategoryId(1L);
    }

    @Test
    void getProductsByCategory_WhenNoCategoryProducts_ShouldReturnEmptyList() {
        // Arrange
        when(productRepository.findByCategoryId(999L)).thenReturn(Arrays.asList());

        // Act
        List<Product> actualProducts = productService.getProductsByCategory(999L);

        // Assert
        assertNotNull(actualProducts);
        assertTrue(actualProducts.isEmpty());
        verify(productRepository, times(1)).findByCategoryId(999L);
    }
}

