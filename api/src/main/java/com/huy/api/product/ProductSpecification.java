package com.huy.api.product;

import com.huy.api.category.Category;
import com.huy.api.category.CategoryRepository;
import com.huy.api.category.Category_;
import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.Predicate;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Component
public class ProductSpecification {
    public Specification<Product> searchByName(String name) {
        return ((root, query, cb) -> {
            if (name == null || name.isBlank())
                return cb.conjunction();

            return cb.like(cb.lower(root.get(Product_.NAME)), "%" + name.toLowerCase() + "%");
        });
    }

    public Specification<Product> filterByBrand(String brandList) {
        return ((root, query, cb) -> {

            if (brandList == null || brandList.isBlank())
                return cb.conjunction();

            List<Predicate> predicates = new ArrayList<>();
            String[] brands = brandList.split(",");
            Arrays.stream(brands).forEach(
                    brand -> predicates.add(cb.equal(root.get(Product_.BRAND), brand.trim()))
            );

            return cb.or(predicates.toArray(new Predicate[0]));
        });
    }

    public Specification<Product> filterByCategoryName(String categoryList, CategoryRepository categoryRepository) {
        return ((root, query, cb) -> {
            if (categoryList == null || categoryList.isBlank())
                return cb.conjunction();

            Join<Product, Category> productCategoryJoin = root.join("category");
            List<Predicate> predicates = new ArrayList<>();
            String[] categories = categoryList.split(",");
            Arrays.stream(categories).forEach(
                    categoryName -> {
                        Category category = categoryRepository.findByCategoryNameIsIgnoreCase(categoryName.trim());

                        if (category != null)
                            predicates.add(cb.equal(productCategoryJoin.get(Category_.ID), category.getId()));
                    }
            );

            return cb.or(predicates.toArray(new Predicate[0]));
        });
    }
}
