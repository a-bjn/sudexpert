package com.backend.sudexpert.service;

import com.backend.sudexpert.domain.Category;
import com.backend.sudexpert.repository.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CategoryService {

    private final CategoryRepository repository;

    public List<Category> getAllCategories() {
        return repository.findAll();
    }

    public Category createCategory(Category category) {
        return repository.save(category);
    }

    public Category getCategoryById(Long id) {
        return repository.findById(id).orElseThrow(() -> new RuntimeException("Category not found"));
    }
}
