package com.huy.api.product;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface ProductMapper {

    @Mapping(target = "categoryName", source = "category.categoryName")
    ProductDto toProductDto(Product product);

    Product toProduct(ProductDto productDto);
}