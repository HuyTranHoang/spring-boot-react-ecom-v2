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
        return (root, query, cb) -> name.equals("all")
                ? cb.conjunction()
                : cb.like(root.get(Product_.NAME), "%" + name + "%");
    }

    public Specification<Product> filterByBrand(String brandList) {
        return ((root, query, cb) -> {

            if (brandList.equals("all"))
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
            if (categoryList.equals("all"))
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
