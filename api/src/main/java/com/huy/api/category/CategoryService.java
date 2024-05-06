package com.huy.api.category;

import com.huy.api.category.dto.CategoryDto;

import java.util.List;

public interface CategoryService {

    List<CategoryDto> getAllCategories();

    CategoryDto getCategoryById(long id);
}
