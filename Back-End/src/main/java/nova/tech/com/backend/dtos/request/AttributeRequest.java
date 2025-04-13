package nova.tech.com.backend.dtos.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AttributeRequest {
    @NotBlank(message = "Label cannot be blank")
    private String label;
}
