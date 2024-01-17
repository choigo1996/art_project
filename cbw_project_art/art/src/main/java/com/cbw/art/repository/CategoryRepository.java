package com.cbw.art.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cbw.art.enumstatus.CategoryType;
import com.cbw.art.model.Category;

public interface CategoryRepository extends JpaRepository<Category, String>{
	Optional<Category> findByCategoryType(CategoryType categoryType);
}
