package nova.tech.com.backend.dtos.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;
import nova.tech.com.backend.models.Brand;
import nova.tech.com.backend.models.Category;
import nova.tech.com.backend.models.Product;
import nova.tech.com.backend.models.ProductAttributeValue;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ProductResponse {

    private Long id;
    private String name;
    private String slug;
    private String thumbnail;
    private Integer oldPrice;
    private Integer newPrice;
    private Integer discount;
    private Integer viewCount;
    private String note;
    private String description;
    private Integer quantity;
    private Boolean active;
    private Brand brand;
    private Category category;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    private List<ProductAttributeResponse> attributes;

    public static ProductResponse convertEntityToResponse(Product product, List<ProductAttributeValue> productAttributeValues){

        List<ProductAttributeResponse> list = new ArrayList<>();
        if(productAttributeValues != null){
            list = productAttributeValues.stream()
                    .map(pa -> ProductAttributeResponse.builder()
                            .attribute(pa.getAttribute().getName())
                            .value(pa.getValue())
                            .label(pa.getAttribute().getLabel())
                            .build())
                    .toList();
        }

        return ProductResponse.builder()
                .id(product.getId())
                .name(product.getName())
                .slug(product.getSlug())
                .thumbnail(product.getThumbnail())
                .oldPrice(product.getPrice())
                .newPrice(product.getPrice() - (product.getPrice() * product.getDiscount() / 100))
                .discount(product.getDiscount())
                .viewCount(product.getViewCount())
                .note(product.getNote())
                .description(product.getDescription())
                .quantity(product.getQuantity())
                .active(product.getActive())
                .brand(product.getBrand())
                .category(product.getCategory())
                .attributes(list)
                .build();
    }
}
