package nova.tech.com.backend.services.attribute;

import lombok.RequiredArgsConstructor;
import nova.tech.com.backend.dtos.response.AttributeResponse;
import nova.tech.com.backend.exceptions.ResourceNotFoundException;
import nova.tech.com.backend.models.Attribute;
import nova.tech.com.backend.models.Category;
import nova.tech.com.backend.models.CategoryAttribute;
import nova.tech.com.backend.models.ProductAttributeValue;
import nova.tech.com.backend.repositories.AttributeRepository;
import nova.tech.com.backend.repositories.CategoryAttributeRepository;
import nova.tech.com.backend.repositories.CategoryRepository;
import nova.tech.com.backend.repositories.ProductAttributeValueRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AttributeServiceImpl implements AttributeService{
    private final AttributeRepository attributeRepository;
    private final CategoryRepository categoryRepository;
    private final CategoryAttributeRepository categoryAttributeRepository;
    private final ProductAttributeValueRepository productAttributeValueRepository;
    @Override
    public Attribute getAttributeById(long id) {
        return attributeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Attribute not found with id: " + id));
    }

    @Override
    public List<?> getAllAttributes(String categorySlug, String brandName) {
        if(categorySlug == null && brandName == null)
            return attributeRepository.findAll();
        Category category = categoryRepository.findBySlug(categorySlug)
                .orElseThrow(() -> new ResourceNotFoundException("Category not found with slug: " + categorySlug));
        List<CategoryAttribute> categoryAttributes = categoryAttributeRepository.findAllByCategory(category);
        List<AttributeResponse> attributeResponses = new ArrayList<>();
        for(CategoryAttribute ca : categoryAttributes){
            List<ProductAttributeValue> productAttributes =
                    productAttributeValueRepository.findAllByAttribute(ca.getAttribute())
                            .stream()
                            .filter(pa -> {
                                boolean checkCategory =
                                        pa.getProduct().getCategory().getSlug().equalsIgnoreCase(categorySlug);
                                boolean checkBrand = brandName == null || pa.getProduct().getBrand().getName().equalsIgnoreCase(brandName);
                                return checkCategory && checkBrand;
                            })
                            .toList();
            attributeResponses.add(AttributeResponse.convertEntityToResponse(ca.getAttribute(), productAttributes));
        }
        return attributeResponses;
    }
}
