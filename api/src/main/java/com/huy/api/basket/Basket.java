package com.huy.api.basket;

import com.huy.api.product.Product;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "basket")
@Getter
@Setter
@NoArgsConstructor
public class Basket {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "buyer_id")
    private String buyerId;

    @OneToMany(mappedBy = "basket", cascade = CascadeType.ALL)
    private List<BasketItem> basketItems;

    public void addItem(Product product, int quantity) {
        if (product != null && quantity > 0) {
            if (basketItems == null) {
                basketItems = new ArrayList<>();
            }

            basketItems.stream()
                    .filter(item -> item.getProduct().getId() == product.getId())
                    .findFirst()
                    .ifPresentOrElse(
                            item -> item.setQuantity(item.getQuantity() + quantity),
                            () -> basketItems.add(new BasketItem(quantity, product, this))
                    );
        }
    }

    public Basket(String buyerId) {
        this.buyerId = buyerId;
    }
}
