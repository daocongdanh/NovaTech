package nova.tech.com.backend.services.brand;

import nova.tech.com.backend.dtos.request.BrandRequest;
import nova.tech.com.backend.dtos.response.PageResponse;
import nova.tech.com.backend.models.Brand;

import java.util.List;

public interface BrandService {
    Brand getBrandById(long id);
    List<Brand> getBrandByCategory(String slug);
    PageResponse getAllBrands(int page, int limit);
    void createBrand(BrandRequest brandRequest);
    void updateBrand(long id, BrandRequest brandRequest);
    void deleteBrand(long id);
}
