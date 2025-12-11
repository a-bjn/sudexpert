package com.backend.sudexpert.repository;

import com.backend.sudexpert.domain.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<Category, Long> {
}
