package com.huy.api.product;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
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
