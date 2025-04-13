package nova.tech.com.backend.dtos.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AttributeForProductRequest {
    @NotNull(message = "AttributeId cannot be null")
    private Long attributeId;

    @NotBlank(message = "Value cannot be blank")
    private String value;
}
