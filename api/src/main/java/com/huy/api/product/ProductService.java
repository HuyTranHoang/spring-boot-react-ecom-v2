package com.huy.api.product;

import com.huy.api.product.dto.ProductDto;
import com.huy.api.product.dto.ProductParams;
import org.springframework.data.domain.Page;

import java.util.List;
import java.util.Map;

public interface ProductService {
    List<ProductDto> findAll();

    ProductDto findById(Long id);

    Product save(ProductDto product);

    Product update(Long id, ProductDto productDto);

    void deleteById(Long id);

    Map<String, Object> search(ProductParams productParams);

    Map<String, Object> getFilterOptions();
}
