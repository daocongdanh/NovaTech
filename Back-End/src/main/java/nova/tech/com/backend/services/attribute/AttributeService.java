package nova.tech.com.backend.services.attribute;

import nova.tech.com.backend.models.Attribute;

import java.util.List;

public interface AttributeService {
    Attribute getAttributeById(long id);
    List<?> getAllAttributes(String categorySlug, String brandName);
}
