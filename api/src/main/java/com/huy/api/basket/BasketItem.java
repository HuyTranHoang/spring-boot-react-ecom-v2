package com.huy.api.basket;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.huy.api.product.Product;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "basket_item")
@Getter
@Setter
@NoArgsConstructor
public class BasketItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private int quantity;

    @OneToOne(cascade = {CascadeType.DETACH, CascadeType.MERGE, CascadeType.PERSIST, CascadeType.REFRESH})
    @JoinColumn(name = "product_id", referencedColumnName = "id")
    @JsonIgnore
    private Product product;

    @ManyToOne
    @JoinColumn(name = "basket_id", referencedColumnName = "id")
    @JsonIgnore
    private Basket basket;

    public BasketItem(int quantity, Product product, Basket basket) {
        this.quantity = quantity;
        this.product = product;
        this.basket = basket;
    }
}
