package com.huy.api.product;

import com.huy.api.category.CategoryRepository;
import com.huy.api.common.PageInfo;
import com.huy.api.product.dto.ProductDto;
import com.huy.api.product.dto.ProductParams;
import com.huy.api.product.mapper.ProductMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

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
    public Map<String, Object> search(ProductParams productParams) {
        Specification<Product> spec = Specification.where(productSpecification.searchByName(productParams.getName()))
                .and(productSpecification.filterByBrand(productParams.getBrand()))
                .and(productSpecification.filterByCategoryName(productParams.getCategoryName(), categoryRepository));

        Sort sort = switch (productParams.getSort()) {
            case "priceAsc" -> Sort.by(Sort.Order.asc(Product_.UNIT_PRICE));
            case "priceDesc" -> Sort.by(Sort.Order.desc(Product_.UNIT_PRICE));
            default -> Sort.by(Sort.Order.asc(Product_.ID));
        };

        Pageable pageable = PageRequest.of(
                productParams.getPageNumber(),
                productParams.getPageSize(),
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

        HashMap<String, Object> response = new HashMap<>();
        response.put("pageInfo", pageInfo);
        response.put("data", productDtoList);

        return response;
    }

    @Override
    public Map<String, Object> getFilterOptions() {
        List<String> brands = productRepository.getBrands();
        List<String> categories = categoryRepository.getCategoriesName();

        HashMap<String, Object> response = new HashMap<>();
        response.put("brands", brands);
        response.put("categories", categories);

        return response;
    }
}
