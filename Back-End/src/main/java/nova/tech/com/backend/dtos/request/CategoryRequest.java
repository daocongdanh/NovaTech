package nova.tech.com.backend.dtos.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CategoryRequest {

    @NotBlank(message = "Name cannot be blank")
    private String name;

    @NotBlank(message = "Image cannot be blank")
    private String image;

    private boolean active;
}
