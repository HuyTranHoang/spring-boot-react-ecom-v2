package com.huy.api.basket;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class BasketServiceImpl implements BasketService {
    private final BasketRepository basketRepository;

    public BasketServiceImpl(BasketRepository basketRepository) {
        this.basketRepository = basketRepository;
    }

    @Override
    public BasketDto getBasket(String cookieBuyerId, String loggedInUsername, HttpServletResponse response) {
        // Not provided JWT token, loggedInUsername is "anonymousUser"
        String buyerId = "anonymousUser".equals(loggedInUsername)
                ? loggedInUsername
                : StringUtils.isNotEmpty(cookieBuyerId)
                ? cookieBuyerId
                : UUID.randomUUID().toString();

        Basket tempBasket = basketRepository.findByBuyerId(buyerId);
        Basket userBasket = "anonymousUser".equals(loggedInUsername)
                ? new Basket()
                : basketRepository.findByBuyerId(loggedInUsername);

        boolean isTempBasketEmpty = tempBasket == null || tempBasket.getBasketItems().isEmpty();
        boolean isUserBasketEmpty = userBasket == null || userBasket.getBasketItems().isEmpty();

        if (isTempBasketEmpty && isUserBasketEmpty) {
            Cookie cookie = new Cookie("buyerId", buyerId);
            cookie.setMaxAge(60 * 60 * 24 * 7);
            cookie.setPath("/");
            response.addCookie(cookie);

            Basket basket = new Basket(buyerId);
            basket.setBasketItems(List.of());

            basketRepository.save(basket);
            return toBasketDto(basket);
        }

        if (isTempBasketEmpty && !cookieBuyerId.equals(loggedInUsername)) {
            return toBasketDto(userBasket);
        }

        if (isUserBasketEmpty) {
            tempBasket.setBuyerId(loggedInUsername);
            return toBasketDto(tempBasket);
        }

        // Merge two baskets
        userBasket.getBasketItems().addAll(tempBasket.getBasketItems());
        basketRepository.delete(tempBasket);
        basketRepository.save(userBasket);

        return toBasketDto(userBasket);
    }

    private BasketDto toBasketDto(Basket basket) {
        List<BasketItemDto> basketItemDtoList = basket.getBasketItems().stream()
                .map(item -> BasketItemDto.builder()
                        .productId(item.getProduct().getId())
                        .productName(item.getProduct().getName())
                        .quantity(item.getQuantity())
                        .brand(item.getProduct().getBrand())
                        .unitPrice(item.getProduct().getUnitPrice())
                        .imageUrl(item.getProduct().getImageUrl())
                        .categoryName(item.getProduct().getCategory().getCategoryName())
                        .build()
                )
                .toList();

        return BasketDto.builder()
                .id(basket.getId())
                .buyerId(basket.getBuyerId())
                .basketItems(basketItemDtoList)
                .build();
    }
}
