package nova.tech.com.backend.dtos.request;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class ProductRequest {
    @NotBlank(message = "Name cannot be blank")
    private String name;
    @NotBlank(message = "Thumbnail cannot be blank")
    private String thumbnail;

    private List<String> images;

    @NotNull(message = "Old Price cannot be null")
    private Integer oldPrice;

    @NotNull(message = "New Price cannot be null")
    private Integer newPrice;

    private String note;
    private String description;

    @NotNull(message = "Quantity cannot be null")
    private Integer quantity;
    private boolean active;

    @NotNull(message = "CategorySlug cannot be null")
    private String categorySlug;

    @NotNull(message = "BrandId cannot be null")
    private Long brandId;
    @Valid
    private List<AttributeForProductRequest> attributes;
}
