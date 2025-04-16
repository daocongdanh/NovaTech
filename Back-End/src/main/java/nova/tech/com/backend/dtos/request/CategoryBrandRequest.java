package nova.tech.com.backend.dtos.request;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CategoryBrandRequest {
    @NotNull(message = "Category ID cannot be null")
    private Long categoryId;

    @NotNull(message = "Brand ID cannot be null")
    private Long brandId;
}
