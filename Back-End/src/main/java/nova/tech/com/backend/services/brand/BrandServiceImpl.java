package nova.tech.com.backend.services.brand;

import lombok.RequiredArgsConstructor;
import nova.tech.com.backend.exceptions.ResourceNotFoundException;
import nova.tech.com.backend.models.Brand;
import nova.tech.com.backend.models.Category;
import nova.tech.com.backend.models.CategoryBrand;
import nova.tech.com.backend.repositories.BrandRepository;
import nova.tech.com.backend.repositories.CategoryBrandRepository;
import nova.tech.com.backend.repositories.CategoryRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BrandServiceImpl implements BrandService{
    private final BrandRepository brandRepository;
    private final CategoryRepository categoryRepository;
    private final CategoryBrandRepository categoryBrandRepository;
    @Override
    public Brand getBrandById(long id) {
        return brandRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Brand not found with id = " + id));
    }

    @Override
    public List<Brand> getAllBrands() {
        return brandRepository.findAll();
    }

    @Override
    public List<Brand> getBrandByCategory(String slug) {
        Category category = categoryRepository.findBySlug(slug)
                .orElseThrow(() -> new ResourceNotFoundException("Category not found"));
        return categoryBrandRepository.findAllByCategory(category)
                .stream()
                .map(CategoryBrand::getBrand)
                .toList();
    }
}
