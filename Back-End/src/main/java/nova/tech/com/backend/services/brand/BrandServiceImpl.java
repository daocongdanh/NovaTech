package nova.tech.com.backend.services.brand;

import lombok.RequiredArgsConstructor;
import nova.tech.com.backend.dtos.request.BrandRequest;
import nova.tech.com.backend.dtos.response.PageResponse;
import nova.tech.com.backend.dtos.response.ProductResponse;
import nova.tech.com.backend.exceptions.ConflictException;
import nova.tech.com.backend.exceptions.InvalidParamException;
import nova.tech.com.backend.exceptions.ResourceNotFoundException;
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
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BrandServiceImpl implements BrandService{
    private final BrandRepository brandRepository;
    private final CategoryRepository categoryRepository;
    private final CategoryBrandRepository categoryBrandRepository;
    private final ProductRepository productRepository;
    @Override
    public Brand getBrandById(long id) {
        return brandRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Brand not found with id = " + id));
    }

    @Override
    public PageResponse getAllBrands(int page, int limit) {
        page = Math.max(page - 1, 0);
        Pageable pageable = PageRequest.of(page, limit);
        Page<Brand> brandPage = brandRepository.findAll(pageable);
        return PageResponse.builder()
                .page(page + 1)
                .limit(limit)
                .totalPage(brandPage.getTotalPages())
                .totalItem((int) brandPage.getTotalElements())
                .result(brandPage.getContent().stream()
                        .toList())
                .build();
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

    @Override
    public void createBrand(BrandRequest brandRequest) {
        if(brandRepository.existsByName(brandRequest.getName())){
            throw new ConflictException("Brand already exists with name: " + brandRequest.getName());
        }
        Brand brand = Brand.builder()
                .name(brandRequest.getName())
                .build();
        brandRepository.save(brand);
    }

    @Override
    public void updateBrand(long id, BrandRequest brandRequest) {
        Brand brand = brandRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Brand not found with id = " + id));
        if(brandRepository.existsByNameAndIdNot(brandRequest.getName(), id)){
            throw new ConflictException("Brand already exists with name: " + brandRequest.getName());
        }
        brand.setName(brandRequest.getName());
        brandRepository.save(brand);
    }

    @Override
    public void deleteBrand(long id) {
        Brand brand = brandRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Brand not found with id = " + id));
        if(productRepository.existsByBrand(brand) || categoryBrandRepository.existsByBrand(brand)){
            throw new ConflictException("Cannot delete brand with id = " + id + " because it is used in product or category");
        }
        brandRepository.delete(brand);
    }
}
