package nova.tech.com.backend.dtos.response;
import lombok.*;
import nova.tech.com.backend.models.Attribute;
import nova.tech.com.backend.models.ProductAttributeValue;

import java.util.List;
import java.util.function.Function;
import java.util.stream.Collectors;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AttributeResponse {
    private Long id;
    private String label;
    private String slug;
    private List<AttributeValueResponse> values;

    public static AttributeResponse convertEntityToResponse(Attribute attribute, List<ProductAttributeValue> productAttributes) {
        return AttributeResponse.builder()
                .id(attribute.getId())
                .label(attribute.getLabel())
                .slug(attribute.getSlug())
                .values(productAttributes.stream()
                        .map(AttributeValueResponse::convertEntityToResponse)
                        .collect(Collectors.toMap(
                                AttributeValueResponse::getValue, // Sử dụng trường value làm khóa
                                Function.identity(), // Sử dụng chính đối tượng là giá trị
                                (existing, replacement) -> existing // Giữ lại phần tử đầu tiên nếu có trùng lặp
                        ))
                        .values()
                        .stream()
                        .toList())
                .build();
    }
}
