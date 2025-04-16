package nova.tech.com.backend.services.categoryattribute;

import nova.tech.com.backend.dtos.request.CategoryAttributeRequest;
import nova.tech.com.backend.dtos.response.PageResponse;

public interface CategoryAttributeService {
    PageResponse getAllCategoryAttributes(int page, int limit);
    void createCategoryAttribute(CategoryAttributeRequest categoryAttributeRequest);
    void deleteCategoryAttribute(Long id);
}
