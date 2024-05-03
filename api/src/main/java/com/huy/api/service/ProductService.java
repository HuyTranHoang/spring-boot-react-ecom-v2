package com.huy.api.service;

import com.huy.api.dto.ProductDto;

import java.util.List;

public interface ProductService {
    List<ProductDto> findAll();

    ProductDto findById(Long id);

    void save(ProductDto product);

    void deleteById(Long id);
}
