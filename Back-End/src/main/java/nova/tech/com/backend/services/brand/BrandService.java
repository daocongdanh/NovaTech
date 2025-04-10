package nova.tech.com.backend.services.brand;

import nova.tech.com.backend.models.Brand;

import java.util.List;

public interface BrandService {
    Brand getBrandById(long id);
    List<Brand> getAllBrands();
    List<Brand> getBrandByCategory(String slug);
}
