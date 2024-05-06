package com.huy.api.product.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProductDto {
    private long id;

    private String name;

    private String description;

    private double unitPrice;

    private String imageUrl;

    private int unitsInStock;

    private String brand;

    private long categoryId;

    private String categoryName;
}
