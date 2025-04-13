package nova.tech.com.backend.services.attribute;

import lombok.RequiredArgsConstructor;
import nova.tech.com.backend.dtos.request.AttributeRequest;
import nova.tech.com.backend.dtos.response.AttributeResponse;
import nova.tech.com.backend.dtos.response.PageResponse;
import nova.tech.com.backend.exceptions.ConflictException;
import nova.tech.com.backend.exceptions.ResourceNotFoundException;
import nova.tech.com.backend.models.*;
import nova.tech.com.backend.repositories.AttributeRepository;
import nova.tech.com.backend.repositories.CategoryAttributeRepository;
import nova.tech.com.backend.repositories.CategoryRepository;
import nova.tech.com.backend.repositories.ProductAttributeValueRepository;
import nova.tech.com.backend.utils.StringUtil;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
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

    @Override
    public List<Attribute> getAttributeByCategory(String slug) {
        Category category = categoryRepository.findBySlug(slug)
                .orElseThrow(() -> new ResourceNotFoundException("Category not found with slug: " + slug));
        return categoryAttributeRepository.findAllByCategory(category).stream()
                .map(CategoryAttribute::getAttribute)
                .toList();
    }

    @Override
    public void createAttribute(AttributeRequest attributeRequest) {
        if(attributeRepository.existsByLabel(attributeRequest.getLabel())){
            throw new ConflictException("Attribute already exists with label: " + attributeRequest.getLabel());
        }
        Attribute attribute = Attribute.builder()
                .label(attributeRequest.getLabel())
                .slug(StringUtil.normalizeString(attributeRequest.getLabel()))
                .build();
        attributeRepository.save(attribute);
    }

    @Override
    public void updateAttribute(long id, AttributeRequest attributeRequest) {
        Attribute attribute = attributeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Attribute not found with id: " + id));
        if(attributeRepository.existsByLabelAndIdNot(attributeRequest.getLabel(), id)){
            throw new ConflictException("Attribute already exists with label: " + attributeRequest.getLabel());
        }
        attribute.setLabel(attributeRequest.getLabel());
        attribute.setSlug(StringUtil.normalizeString(attributeRequest.getLabel()));
        attributeRepository.save(attribute);
    }

    @Override
    public void deleteAttribute(long id) {
        Attribute attribute = attributeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Attribute not found with id: " + id));
        if(productAttributeValueRepository.existsByAttribute(attribute) ||
                categoryAttributeRepository.existsByAttribute(attribute)){
            throw new ConflictException("Attribute cannot be deleted because it is used in product or category");
        }
        attributeRepository.delete(attribute);

    }

    @Override
    public PageResponse getAllAttributesWithPagination(int page, int limit) {
        page = Math.max(page - 1, 0);
        Pageable pageable = PageRequest.of(page, limit);
        Page<Attribute> attributePage = attributeRepository.findAll(pageable);
        return PageResponse.builder()
                .page(page + 1)
                .limit(limit)
                .totalPage(attributePage.getTotalPages())
                .totalItem((int) attributePage.getTotalElements())
                .result(attributePage.getContent().stream()
                        .toList())
                .build();
    }
}
