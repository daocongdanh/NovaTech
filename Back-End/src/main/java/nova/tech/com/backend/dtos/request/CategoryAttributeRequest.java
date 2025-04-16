package nova.tech.com.backend.dtos.request;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CategoryAttributeRequest {
    @NotNull(message = "Category ID cannot be null")
    private Long categoryId;

    @NotNull(message = "Attribute ID cannot be null")
    private Long attributeId;
}
