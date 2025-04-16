package nova.tech.com.backend.services.categorybrand;

import lombok.RequiredArgsConstructor;
import nova.tech.com.backend.dtos.request.CategoryBrandRequest;
import nova.tech.com.backend.dtos.response.PageResponse;
import nova.tech.com.backend.exceptions.ConflictException;
import nova.tech.com.backend.models.Brand;
import nova.tech.com.backend.models.Category;
import nova.tech.com.backend.models.CategoryBrand;
import nova.tech.com.backend.repositories.BrandRepository;
import nova.tech.com.backend.repositories.CategoryBrandRepository;
import nova.tech.com.backend.repositories.CategoryRepository;
import nova.tech.com.backend.repositories.ProductRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CategoryBrandServiceImpl implements CategoryBrandService{
    private final CategoryBrandRepository categoryBrandRepository;
    private final CategoryRepository categoryRepository;
    private final BrandRepository brandRepository;
    private final ProductRepository productRepository;
    @Override
    public PageResponse getAllCategoryBrands(int page, int limit) {
        page = Math.max(page - 1, 0);
        Pageable pageable = PageRequest.of(page, limit, Sort.by("category.name").ascending());
        Page<CategoryBrand> categoryBrandPage = categoryBrandRepository.findAll(pageable);
        return PageResponse.builder()
                .page(page + 1)
                .limit(limit)
                .totalPage(categoryBrandPage.getTotalPages())
                .totalItem((int) categoryBrandPage.getTotalElements())
                .result(categoryBrandPage.getContent().stream()
                        .toList())
                .build();
    }

    @Override
    public void createCategoryBrand(CategoryBrandRequest categoryBrandRequest) {
        Category category = categoryRepository.findById(categoryBrandRequest.getCategoryId())
                .orElseThrow(() -> new RuntimeException("Category not found with id: " + categoryBrandRequest.getCategoryId()));
        Brand brand = brandRepository.findById(categoryBrandRequest.getBrandId())
                .orElseThrow(() -> new RuntimeException("Brand not found with id: " + categoryBrandRequest.getBrandId()));
        if (categoryBrandRepository.existsByCategoryAndBrand(category, brand)) {
            throw new ConflictException("Category already has this brand");
        }
        CategoryBrand categoryBrand = new CategoryBrand();
        categoryBrand.setCategory(category);
        categoryBrand.setBrand(brand);
        categoryBrandRepository.save(categoryBrand);

    }

    @Override
    public void deleteCategoryBrand(Long id) {
        CategoryBrand categoryBrand = categoryBrandRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Category brand not found with id: " + id));
        if (productRepository.existsByCategoryAndBrand(categoryBrand.getCategory(), categoryBrand.getBrand())) {
            throw new ConflictException("Category brand cannot be deleted because it is used by products");
        }
        categoryBrandRepository.delete(categoryBrand);
    }
}
