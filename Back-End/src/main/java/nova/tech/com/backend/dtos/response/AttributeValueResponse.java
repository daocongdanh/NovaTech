package nova.tech.com.backend.dtos.response;

import lombok.*;
import nova.tech.com.backend.models.ProductAttributeValue;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AttributeValueResponse {
    private String value;
    private String slug;
    public static AttributeValueResponse convertEntityToResponse(ProductAttributeValue productAttributeValue){
        return AttributeValueResponse.builder()
                .value(productAttributeValue.getValue())
                .slug(productAttributeValue.getSlug())
                .build();
    }
}
