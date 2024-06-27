package com.huy.api.product;

import com.huy.api.product.dto.ProductDto;
import org.springframework.data.domain.Page;

import java.util.List;
import java.util.Map;

public interface ProductService {
    List<ProductDto> findAll();

    ProductDto findById(Long id);

    Product save(ProductDto product);

    Product update(Long id, ProductDto productDto);

    void deleteById(Long id);

    Map<String, Object> search(String name, String brand, String CategoryName, int pageNumber, int pageSize, String sortBy);
}
