package nova.tech.com.backend.services.product;

import lombok.RequiredArgsConstructor;
import nova.tech.com.backend.dtos.response.PageResponse;
import nova.tech.com.backend.dtos.response.ProductResponse;
import nova.tech.com.backend.exceptions.ResourceNotFoundException;
import nova.tech.com.backend.models.Category;
import nova.tech.com.backend.repositories.CategoryRepository;
import nova.tech.com.backend.repositories.ProductRepository;
import nova.tech.com.backend.repositories.SearchRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService{
    private final SearchRepository searchRepository;
    private final CategoryRepository categoryRepository;
    private final ProductRepository productRepository;
    @Override
    public PageResponse searchProduct(int page, int limit, String brand, String category, String[] search, boolean active, String... sort) {
        return searchRepository.searchProduct(page, limit, brand, category, search, active, sort);
    }

    @Override
    public List<ProductResponse> getTop10ProductsByCategory(Long cid) {
        Category category = categoryRepository.findById(cid)
                .orElseThrow(() -> new ResourceNotFoundException("Category not found with id: " + cid));

        return productRepository.findTop10ByCategoryAndActiveOrderByViewCountDesc(category, true)
                .stream()
                .map(product -> ProductResponse.convertEntityToResponse(
                        product, null))
                .toList();
    }
}
