package com.huy.api.product;

import com.huy.api.category.CategoryRepository;
import com.huy.api.common.PageInfo;
import com.huy.api.product.dto.ProductDto;
import com.huy.api.product.mapper.ProductMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;

@Service
public class ProductServiceImpl implements ProductService {
    private final ProductRepository productRepository;
    private final ProductMapper productMapper;
    private final ProductSpecification productSpecification;
    private final CategoryRepository categoryRepository;

    public ProductServiceImpl(ProductRepository productRepository, ProductMapper productMapper, ProductSpecification productSpecification, CategoryRepository categoryRepository) {
        this.productRepository = productRepository;
        this.productMapper = productMapper;
        this.productSpecification = productSpecification;
        this.categoryRepository = categoryRepository;
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
    public Product save(ProductDto product) {
        Product productEntity = productMapper.toProduct(product);
        return productRepository.save(productEntity);
    }

    @Override
    public Product update(Long id, ProductDto productDto) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found"));
        productMapper.updateProductFromDto(productDto, product);
        return productRepository.save(product);
    }

    @Override
    public void deleteById(Long id) {
        productRepository.deleteById(id);
    }

    @Override
    public Page<ProductDto> search(String name, String brand, String categoryName, int pageNumber, int pageSize, String sortBy) {
        Specification<Product> spec = Specification.where(productSpecification.searchByName(name))
                .and(productSpecification.filterByBrand(brand))
                .and(productSpecification.filterByCategoryName(categoryName, categoryRepository));

        Sort sort = switch (sortBy) {
            case "priceAsc" -> Sort.by(Sort.Order.asc("price"));
            case "priceDesc" -> Sort.by(Sort.Order.desc("price"));
            default -> Sort.by(Sort.Order.asc("id"));
        };

        Pageable pageable = PageRequest.of(
                pageNumber,
                pageSize,
                sort
        );

        Page<Product> productPage = productRepository.findAll(spec, pageable);

        PageInfo pageInfo = new PageInfo(
                productPage.getNumber(),
                productPage.getTotalElements(),
                productPage.getTotalPages(),
                productPage.getSize()
        );

        List<ProductDto> productDtoList = productPage.stream()
                .map(productMapper::toProductDto)
                .toList();

        HashMap<String, Object> meta = new HashMap<>();
        meta.put("pageInfo", pageInfo);
        meta.put("data", productDtoList)

        return meta;
    }
}
