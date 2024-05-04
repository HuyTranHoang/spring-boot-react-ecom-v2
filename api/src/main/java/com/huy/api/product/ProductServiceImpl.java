package com.huy.api.product;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductServiceImpl implements ProductService {
    private final ProductRepository productRepository;
    private final ProductMapper productMapper;

    public ProductServiceImpl(ProductRepository productRepository, ProductMapper productMapper) {
        this.productRepository = productRepository;
        this.productMapper = productMapper;
    }

    @Override
    public List<ProductDto> findAll() {
        return productRepository.findAll()
                .stream()
                .map(productMapper::toProductDto)
                .toList();
    }

    @Override
    public ProductDto findById(Long id) {
        return productRepository.findById(id)
                .map(productMapper::toProductDto)
                .orElse(null);
    }

    @Override
    public void save(ProductDto product) {
        Product productEntity = productMapper.toProduct(product);
        productRepository.save(productEntity);
    }

    @Override
    public void deleteById(Long id) {
        productRepository.deleteById(id);
    }
}
