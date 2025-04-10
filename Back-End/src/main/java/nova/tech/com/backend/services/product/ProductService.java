package nova.tech.com.backend.services.product;

import nova.tech.com.backend.dtos.response.PageResponse;
import nova.tech.com.backend.dtos.response.ProductResponse;

import java.util.List;

public interface ProductService {
    PageResponse searchProduct(
            int page, int limit, String brand,String category, String[] search, boolean active,
            String... sort);

    List<ProductResponse> getTop10ProductsByCategory(Long cid);
}
