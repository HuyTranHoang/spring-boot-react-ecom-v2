package com.huy.api.basket;

import com.huy.api.product.Product;
import com.huy.api.product.ProductRepository;
import jakarta.persistence.NoResultException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.transaction.Transactional;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/basket")
public class BasketController {

    private final ProductRepository productRepository;

    private final BasketRepository basketRepository;

    private final BasketItemRepository basketItemRepository;

    public BasketController(ProductRepository productRepository, BasketRepository basketRepository, BasketItemRepository basketItemRepository) {
        this.productRepository = productRepository;
        this.basketRepository = basketRepository;
        this.basketItemRepository = basketItemRepository;
    }

    @GetMapping({"/", ""})
    public ResponseEntity<BasketDto> getBasket(@CookieValue(name = "buyerId", defaultValue = "") String buyerId) {
        Basket basket = basketRepository.findByBuyerId(buyerId);
        if (basket == null) {
            throw new NoResultException("Basket not found");
        }

        return getBasketDtoResponseEntity(basket);

    }

    @PostMapping({"/", ""})
    @Transactional
    public ResponseEntity<BasketDto> addItemToBasket(@RequestParam long productId,
                                                     @RequestParam int quantity,
                                                     @CookieValue(name = "buyerId", defaultValue = "") String buyerId,
                                                     HttpServletResponse response) {
        Basket basket = basketRepository.findByBuyerId(buyerId);

        if (basket == null) {
            buyerId = UUID.randomUUID().toString();
            Cookie cookie = new Cookie("buyerId", buyerId);
            cookie.setMaxAge(60 * 60 * 24 * 7);
            response.addCookie(cookie);
            basket = new Basket(buyerId);
        }

        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new NoResultException("Product not found"));

        basket.addItem(product, quantity);

        basketRepository.save(basket);

        return getBasketDtoResponseEntity(basket);
    }

    @PutMapping({"/", ""})
    @Transactional
    public ResponseEntity<BasketDto> updateItemInBasket(@RequestParam long productId,
                                                        @RequestParam int quantity,
                                                        @CookieValue(name = "buyerId", defaultValue = "") String buyerId) {
        Basket basket = basketRepository.findByBuyerId(buyerId);
        if (basket == null) {
            throw new NoResultException("Basket not found");
        }

        BasketItem existingBasketItem = basket.getBasketItems().stream()
                .filter(item -> item.getProduct().getId() == productId)
                .findFirst()
                .orElseThrow(() -> new NoResultException("Product not found in basket"));

        if (quantity <= 0) {
            basket.getBasketItems().remove(existingBasketItem);
            basketItemRepository.delete(existingBasketItem);
            basketRepository.save(basket);
            return getBasketDtoResponseEntity(basket);
        }

        existingBasketItem.setQuantity(quantity);
        basketItemRepository.save(existingBasketItem);

        return getBasketDtoResponseEntity(basket);
    }

    @DeleteMapping({"/", ""})
    @Transactional
    public ResponseEntity<BasketDto> removeItemFromBasket(@RequestParam long productId,
                                                          @CookieValue(name = "buyerId", defaultValue = "") String buyerId) {
        Basket basket = basketRepository.findByBuyerId(buyerId);
        if (basket == null) {
            throw new NoResultException("Basket not found");
        }

        BasketItem existingBasketItem = basket.getBasketItems().stream()
                .filter(item -> item.getProduct().getId() == productId)
                .findFirst()
                .orElseThrow(() -> new NoResultException("Product not found in basket"));

        basket.getBasketItems().remove(existingBasketItem);
        basketItemRepository.delete(existingBasketItem);
        basketRepository.save(basket);

        return getBasketDtoResponseEntity(basket);
    }

    private ResponseEntity<BasketDto> getBasketDtoResponseEntity(Basket basket) {
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

        BasketDto basketDto = BasketDto.builder()
                .id(basket.getId())
                .buyerId(basket.getBuyerId())
                .basketItems(basketItemDtoList)
                .build();

        return ResponseEntity.ok(basketDto);
    }
}
