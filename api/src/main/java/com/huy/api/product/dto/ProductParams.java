package com.huy.api.product.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProductParams {
    private String name;
    private String brand;
    private String categoryName;
    private int pageNumber = 0;
    private int pageSize = 6;
    private String sort = "id";
}
