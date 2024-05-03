package com.huy.api.controller;

import com.huy.api.dao.ProductRepository;
import com.huy.api.dto.ProductDto;
import com.huy.api.mapper.ProductMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/products")
public class ProductController {

    private final ProductRepository productRepository;

    public ProductController(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    @GetMapping
    public ResponseEntity<List<ProductDto>> getProducts() {
        List<ProductDto> productDtos = productRepository.findAll()
                .stream()
                .map(ProductMapper::toProductDto)
                .toList();

        return ResponseEntity.ok(productDtos);
    }
}
