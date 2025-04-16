package nova.tech.com.backend.services.categorybrand;

import nova.tech.com.backend.dtos.request.CategoryBrandRequest;
import nova.tech.com.backend.dtos.response.PageResponse;

public interface CategoryBrandService {
    PageResponse getAllCategoryBrands(int page, int limit);
    void createCategoryBrand(CategoryBrandRequest categoryBrandRequest);
    void deleteCategoryBrand(Long id);
}
