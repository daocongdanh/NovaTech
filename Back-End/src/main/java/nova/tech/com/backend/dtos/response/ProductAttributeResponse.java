package nova.tech.com.backend.dtos.response;
import lombok.*;
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductAttributeResponse {
    private Long attributeId;
    private String slug;
    private String value;
    private String label;
}
