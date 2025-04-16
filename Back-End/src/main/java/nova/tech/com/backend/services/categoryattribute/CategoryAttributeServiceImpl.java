package nova.tech.com.backend.services.categoryattribute;

import lombok.RequiredArgsConstructor;
import nova.tech.com.backend.dtos.request.CategoryAttributeRequest;
import nova.tech.com.backend.dtos.response.PageResponse;
import nova.tech.com.backend.exceptions.ConflictException;
import nova.tech.com.backend.exceptions.ResourceNotFoundException;
import nova.tech.com.backend.models.Attribute;
import nova.tech.com.backend.models.Brand;
import nova.tech.com.backend.models.Category;
import nova.tech.com.backend.models.CategoryAttribute;
import nova.tech.com.backend.repositories.AttributeRepository;
import nova.tech.com.backend.repositories.CategoryAttributeRepository;
import nova.tech.com.backend.repositories.CategoryRepository;
import nova.tech.com.backend.repositories.ProductAttributeValueRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CategoryAttributeServiceImpl implements CategoryAttributeService{
    private final CategoryAttributeRepository categoryAttributeRepository;
    private final CategoryRepository categoryRepository;
    private final AttributeRepository attributeRepository;
    private final ProductAttributeValueRepository productAttributeValueRepository;

    @Override
    public PageResponse getAllCategoryAttributes(int page, int limit) {
        page = Math.max(page - 1, 0);
        Pageable pageable = PageRequest.of(page, limit, Sort.by("category.name").ascending());
        Page<CategoryAttribute> categoryAttributePage = categoryAttributeRepository.findAll(pageable);
        return PageResponse.builder()
                .page(page + 1)
                .limit(limit)
                .totalPage(categoryAttributePage.getTotalPages())
                .totalItem((int) categoryAttributePage.getTotalElements())
                .result(categoryAttributePage.getContent().stream()
                        .toList())
                .build();
    }

    @Override
    public void createCategoryAttribute(CategoryAttributeRequest categoryAttributeRequest) {
        Category category = categoryRepository.findById(categoryAttributeRequest.getCategoryId())
                .orElseThrow(() -> new RuntimeException("Category not found with id: " + categoryAttributeRequest.getCategoryId()));
        Attribute attribute = attributeRepository.findById(categoryAttributeRequest.getAttributeId())
                .orElseThrow(() -> new RuntimeException("Attribute not found with id: " + categoryAttributeRequest.getAttributeId()));

        if (categoryAttributeRepository.existsByCategoryAndAttribute(category, attribute)) {
            throw new ConflictException("Category already has this attribute");
        }
        CategoryAttribute categoryAttribute = CategoryAttribute.builder()
                .category(category)
                .attribute(attribute)
                .build();

        categoryAttributeRepository.save(categoryAttribute);

    }

    @Override
    public void deleteCategoryAttribute(Long id) {
        CategoryAttribute categoryAttribute = categoryAttributeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Category attribute not found"));
        if (productAttributeValueRepository.existsByCategoryAndAttribute(categoryAttribute.getCategory(), categoryAttribute.getAttribute())) {
            throw new ConflictException("Category attribute is already in use");
        }
        categoryAttributeRepository.delete(categoryAttribute);

    }
}
