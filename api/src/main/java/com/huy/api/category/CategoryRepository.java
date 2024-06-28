package com.huy.api.category;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {

    @Query("SELECT c FROM Category c WHERE c.categoryName = ?1")
    Category findByName(String name);

    Category findByCategoryNameIsIgnoreCase(String categoryName);

    @Query(value = "SELECT DISTINCT c.category_name FROM Product_category c", nativeQuery = true)
    List<String> getCategoriesName();
}
