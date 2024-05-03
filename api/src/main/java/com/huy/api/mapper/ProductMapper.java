package com.huy.api.mapper;
import com.huy.api.dto.ProductDto;
import com.huy.api.entity.Product;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface ProductMapper {

    @Mapping(target = "categoryName", source = "category.categoryName")
    ProductDto toProductDto(Product product);

    Product toProduct(ProductDto productDto);
}