package nova.tech.com.backend.dtos.response;

import lombok.*;
import nova.tech.com.backend.models.ProductImage;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ImageResponse {
    private Long id;
    private String imageUrl;

    public static ImageResponse convertEntityToResponse(ProductImage productImage) {
        return ImageResponse.builder()
                .id(productImage.getId())
                .imageUrl(productImage.getImageUrl())
                .build();
    }
}
