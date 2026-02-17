package com.backend.sudexpert.repository;

import com.backend.sudexpert.domain.Category;
import com.backend.sudexpert.domain.Product;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

@DataJpaTest
class ProductRepositoryTest {

    @Autowired
    private TestEntityManager entityManager;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    private Category testCategory;

    @BeforeEach
    void setUp() {
        testCategory = Category.builder()
                .name("Electrozi")
                .build();
        entityManager.persist(testCategory);
        entityManager.flush();
    }

    @Test
    void findByCategoryId_ShouldReturnProductsInCategory() {
        Product product1 = Product.builder()
                .name("Electrozi E6013")
                .description("Electrozi de calitate")
                .price(new BigDecimal("150.00"))
                .stock(100)
                .category(testCategory)
                .build();

        Product product2 = Product.builder()
                .name("Electrozi E7018")
                .description("Electrozi profesionali")
                .price(new BigDecimal("180.00"))
                .stock(50)
                .category(testCategory)
                .build();

        entityManager.persist(product1);
        entityManager.persist(product2);
        entityManager.flush();

        List<Product> products = productRepository.findByCategoryId(testCategory.getId());

        assertNotNull(products);
        assertEquals(2, products.size());
        assertTrue(products.stream().allMatch(p -> p.getCategory().getId().equals(testCategory.getId())));
    }

    @Test
    void findByCategoryId_WhenNoCategoryProducts_ShouldReturnEmptyList() {
        List<Product> products = productRepository.findByCategoryId(999L);

        assertNotNull(products);
        assertTrue(products.isEmpty());
    }

    @Test
    void save_ShouldPersistProduct() {
        Product product = Product.builder()
                .name("Test Product")
                .description("Test Description")
                .price(new BigDecimal("100.00"))
                .stock(10)
                .category(testCategory)
                .build();

        Product savedProduct = productRepository.save(product);

        assertNotNull(savedProduct.getId());
        assertEquals("Test Product", savedProduct.getName());
        assertEquals(new BigDecimal("100.00"), savedProduct.getPrice());
    }

    @Test
    void findById_WhenProductExists_ShouldReturnProduct() {
        Product product = Product.builder()
                .name("Test Product")
                .price(new BigDecimal("100.00"))
                .category(testCategory)
                .build();
        Product savedProduct = entityManager.persist(product);
        entityManager.flush();

        Optional<Product> foundProduct = productRepository.findById(savedProduct.getId());

        assertTrue(foundProduct.isPresent());
        assertEquals("Test Product", foundProduct.get().getName());
    }

    @Test
    void findAll_ShouldReturnAllProducts() {
        Product product1 = Product.builder()
                .name("Product 1")
                .price(new BigDecimal("100.00"))
                .category(testCategory)
                .build();

        Product product2 = Product.builder()
                .name("Product 2")
                .price(new BigDecimal("200.00"))
                .category(testCategory)
                .build();

        entityManager.persist(product1);
        entityManager.persist(product2);
        entityManager.flush();

        List<Product> products = productRepository.findAll();

        assertNotNull(products);
        assertTrue(products.size() >= 2);
    }
}

