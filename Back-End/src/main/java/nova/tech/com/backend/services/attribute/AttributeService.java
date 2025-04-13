package nova.tech.com.backend.services.attribute;

import nova.tech.com.backend.dtos.request.AttributeRequest;
import nova.tech.com.backend.dtos.response.PageResponse;
import nova.tech.com.backend.models.Attribute;

import java.util.List;

public interface AttributeService {
    Attribute getAttributeById(long id);
    List<?> getAllAttributes(String categorySlug, String brandName);
    List<Attribute> getAttributeByCategory(String slug);
    void createAttribute(AttributeRequest attributeRequest);
    void updateAttribute(long id, AttributeRequest attributeRequest);
    void deleteAttribute(long id);
    PageResponse getAllAttributesWithPagination(int page, int limit);
}
