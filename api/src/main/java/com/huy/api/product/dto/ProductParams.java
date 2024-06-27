package com.huy.api.product.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class ProductParams {
    private String name;
    private String brand;
    private String categoryName;
    private int pageNumber;
    private int pageSize;
    private String sortBy;
}
