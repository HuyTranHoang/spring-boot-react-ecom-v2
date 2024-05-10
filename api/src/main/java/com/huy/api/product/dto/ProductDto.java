package com.huy.api.product.dto;

import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

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

    private MultipartFile file;
}
