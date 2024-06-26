package com.huy.api.product;

import org.springframework.data.jpa.domain.Specification;

public class ProductSpecification {

    public static Specification<Product> hasBrandName(String brandName) {
        return (root, query, criteriaBuilder) -> criteriaBuilder.like(root.get(Product_.BRAND), "%" + brandName + "%");
    }
}
