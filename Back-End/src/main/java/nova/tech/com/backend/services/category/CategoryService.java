package nova.tech.com.backend.services.category;

import nova.tech.com.backend.dtos.request.CategoryRequest;
import nova.tech.com.backend.models.Category;

import java.util.List;

public interface CategoryService {
    Category createCategory(CategoryRequest categoryRequest);
    List<Category> getAllCategories(Boolean active);
    Category getCategoryById(Long id);
    Category getCategoryBySlug(String slug);
    Category updateCategory(Long id, CategoryRequest categoryRequest);
    void deleteCategory(Long id);
}
