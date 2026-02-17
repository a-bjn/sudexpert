package com.backend.sudexpert.service;

import com.backend.sudexpert.domain.Category;
import com.backend.sudexpert.repository.CategoryRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class CategoryServiceTest {

    @Mock
    private CategoryRepository categoryRepository;

    @InjectMocks
    private CategoryService categoryService;

    private Category testCategory;

    @BeforeEach
    void setUp() {
        testCategory = Category.builder()
                .id(1L)
                .name("Electrozi")
                .build();
    }

    @Test
    void getAllCategories_ShouldReturnAllCategories() {
        Category category2 = Category.builder()
                .id(2L)
                .name("Sârmă de sudură")
                .build();
        List<Category> expectedCategories = Arrays.asList(testCategory, category2);
        when(categoryRepository.findAll()).thenReturn(expectedCategories);

        List<Category> actualCategories = categoryService.getAllCategories();

        assertNotNull(actualCategories);
        assertEquals(2, actualCategories.size());
        assertEquals(expectedCategories, actualCategories);
        verify(categoryRepository, times(1)).findAll();
    }

    @Test
    void createCategory_ShouldSaveAndReturnCategory() {
        when(categoryRepository.save(any(Category.class))).thenReturn(testCategory);

        Category savedCategory = categoryService.createCategory(testCategory);

        assertNotNull(savedCategory);
        assertEquals(testCategory.getName(), savedCategory.getName());
        verify(categoryRepository, times(1)).save(testCategory);
    }

    @Test
    void getCategoryById_WhenCategoryExists_ShouldReturnCategory() {
        when(categoryRepository.findById(1L)).thenReturn(Optional.of(testCategory));

        Category foundCategory = categoryService.getCategoryById(1L);

        assertNotNull(foundCategory);
        assertEquals(testCategory.getId(), foundCategory.getId());
        assertEquals(testCategory.getName(), foundCategory.getName());
        verify(categoryRepository, times(1)).findById(1L);
    }

    @Test
    void getCategoryById_WhenCategoryDoesNotExist_ShouldThrowException() {
        when(categoryRepository.findById(999L)).thenReturn(Optional.empty());

        RuntimeException exception = assertThrows(RuntimeException.class, () -> {
            categoryService.getCategoryById(999L);
        });
        assertEquals("Category not found", exception.getMessage());
        verify(categoryRepository, times(1)).findById(999L);
    }
}

