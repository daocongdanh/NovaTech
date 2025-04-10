package nova.tech.com.backend.dtos.response;

import lombok.*;
import nova.tech.com.backend.models.CategoryBrand;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CategoryBrandResponse {
    private Long id;
    private String brand;
    private String category;

    public static CategoryBrandResponse convertEntityToResponse(CategoryBrand categoryBrand){
        return CategoryBrandResponse.builder()
                .id(categoryBrand.getId())
                .brand(categoryBrand.getBrand().getName())
                .category(categoryBrand.getCategory().getName())
                .build();
    }
}
