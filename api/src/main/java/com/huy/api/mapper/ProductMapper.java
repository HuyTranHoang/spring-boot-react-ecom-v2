package com.huy.api.mapper;

import com.huy.api.dto.ProductDto;
import com.huy.api.entity.Product;

public class ProductMapper {
    public static ProductDto toProductDto(Product product) {
        return ProductDto.builder()
                .id(product.getId())
                .name(product.getName())
                .description(product.getDescription())
                .unitPrice(product.getUnitPrice())
                .imageUrl(product.getImageUrl())
                .unitsInStock(product.getUnitsInStock())
                .brand(product.getBrand())
                .categoryName(product.getCategory().getCategoryName())
                .build();
    }

    public static Product toProduct(ProductDto productDto) {
        return Product.builder()
                .id(productDto.getId())
                .name(productDto.getName())
                .description(productDto.getDescription())
                .unitPrice(productDto.getUnitPrice())
                .imageUrl(productDto.getImageUrl())
                .unitsInStock(productDto.getUnitsInStock())
                .brand(productDto.getBrand())
                .build();
    }
}
