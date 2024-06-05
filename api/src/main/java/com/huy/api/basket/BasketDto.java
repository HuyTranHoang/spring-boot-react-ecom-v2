package com.huy.api.basket;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class BasketDto {

    private long id;

    private String buyerId;

    private List<BasketItemDto> basketItems;
}
