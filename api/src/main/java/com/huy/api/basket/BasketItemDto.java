package com.huy.api.basket;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BasketItemDto {

    private long productId;

    private String productName;

    private double unitPrice;

    private String imageUrl;

    private String brand;

    private String categoryName;

    private int quantity;
}
