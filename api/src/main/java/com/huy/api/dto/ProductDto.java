package com.huy.api.dto;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

@Getter
@Setter
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ProductDto {
    long id;

    String name;

    String description;

    double unitPrice;

    String imageUrl;

    int unitsInStock;

    String brand;

    String categoryName;
}
