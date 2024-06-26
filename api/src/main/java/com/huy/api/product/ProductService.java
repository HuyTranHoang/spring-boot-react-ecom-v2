package com.huy.api.product;

import com.huy.api.product.dto.ProductDto;
import org.springframework.data.domain.Page;

import java.util.List;

public interface ProductService {
    List<ProductDto> findAll();

    ProductDto findById(Long id);

    Product save(ProductDto product);

    Product update(Long id, ProductDto productDto);

    void deleteById(Long id);

    Page<ProductDto> search(String name, String brand, String CategoryName, int pageNumber, int pageSize, String sortBy);
}
