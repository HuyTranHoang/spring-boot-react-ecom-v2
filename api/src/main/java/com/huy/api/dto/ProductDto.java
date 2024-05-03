package com.huy.api.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ProductDto {
    private long id;

    private String name;

    private String description;

    private double unitPrice;

    private String imageUrl;

    private int unitsInStock;

    private String brand;

    private String categoryName;
}
