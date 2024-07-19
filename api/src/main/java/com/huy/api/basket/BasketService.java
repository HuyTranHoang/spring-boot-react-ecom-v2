package com.huy.api.basket;

import jakarta.servlet.http.HttpServletResponse;

public interface BasketService {
    BasketDto getBasket(String cookieBuyerId, String loggedInUsername, HttpServletResponse response);
}
