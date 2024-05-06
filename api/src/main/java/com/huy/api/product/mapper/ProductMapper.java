package com.huy.api.product.mapper;

import com.huy.api.category.Category;
import com.huy.api.category.CategoryService;
import com.huy.api.category.dto.CategoryDto;
import com.huy.api.product.Product;
import com.huy.api.product.dto.ProductDto;
import org.mapstruct.AfterMapping;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.springframework.beans.factory.annotation.Autowired;

@Mapper(componentModel = "spring")
public abstract class ProductMapper {

    @Autowired
    protected CategoryService categoryService;

    @Mapping(target = "categoryId", source = "category.id")
    @Mapping(target = "categoryName", source = "category.categoryName")
    public abstract ProductDto toProductDto(Product product);

    @Mapping(target = "category.id", source = "categoryId")
    public abstract Product toProduct(ProductDto productDto);

    public abstract void updateProductFromDto(ProductDto productDto, @MappingTarget Product product);

    @AfterMapping
    protected void mapCategoryIdToCategory(ProductDto productDto, @MappingTarget Product product) {
        if (productDto.getCategoryId() != 0) {
            CategoryDto categoryDto = categoryService.getCategoryById(productDto.getCategoryId());
            Category category = Category.builder()
                    .id(categoryDto.getId())
                    .categoryName(categoryDto.getCategoryName())
                    .build();
            product.setCategory(category);
        }
    }


}