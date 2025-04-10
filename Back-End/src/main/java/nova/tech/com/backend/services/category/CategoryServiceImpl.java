package nova.tech.com.backend.services.category;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import nova.tech.com.backend.dtos.request.CategoryRequest;
import nova.tech.com.backend.dtos.response.CategoryBrandResponse;
import nova.tech.com.backend.exceptions.ConflictException;
import nova.tech.com.backend.exceptions.ResourceNotFoundException;
import nova.tech.com.backend.models.Category;
import nova.tech.com.backend.repositories.CategoryBrandRepository;
import nova.tech.com.backend.repositories.CategoryRepository;
import nova.tech.com.backend.utils.StringUtil;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j(topic = "CATEGORY-SERVICE")
public class CategoryServiceImpl implements CategoryService {
    private final CategoryRepository categoryRepository;
    private final CategoryBrandRepository categoryBrandRepository;

    @Override
    public Category createCategory(CategoryRequest categoryRequest) {
        log.info("Creating category with name: {}", categoryRequest.getName());

        if (categoryRepository.existsByName(categoryRequest.getName())) {
            log.error("Category with name {} already exists", categoryRequest.getName());
            throw new ConflictException("Category with name " + categoryRequest.getName() + " already exists");
        }

        Category category = Category.builder()
                .name(categoryRequest.getName())
//                .label(categoryRequest.getLabel())
                .icon(categoryRequest.getIcon())
                .active(categoryRequest.isActive())
                .build();
        categoryRepository.save(category);
        return category;
    }

    @Override
    public List<Category> getAllCategories(Boolean active) {
        log.info("Fetching all categories");
        if(active != null) {
            return categoryRepository.findAllByActive(active);
        }
        return categoryRepository.findAll();
    }

    @Override
    public Category getCategoryById(Long id) {
        log.info("Fetching category with id: {}", id);
        return categoryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Category not found with id: " + id));
    }

    @Override
    public Category getCategoryBySlug(String slug) {
        return null;
//        return categoryRepository.findBySlug(slug)
//                .orElseThrow(() -> new ResourceNotFoundException("Category not found with slug: " + slug));
    }

    @Override
    public Category updateCategory(Long id, CategoryRequest categoryRequest) {
        log.info("Updating category with id: {}", id);
        Category category = getCategoryById(id);

        if (categoryRepository.existsByNameAndIdNot(categoryRequest.getName(), id)) {
            log.error("Category with name {} already exists", categoryRequest.getName());
            throw new ConflictException("Category with name " + categoryRequest.getName() + " already exists");
        }
        category.setName(categoryRequest.getName());
//        category.setLabel(categoryRequest.getLabel());
        category.setIcon(categoryRequest.getIcon());
        category.setActive(categoryRequest.isActive());
        return category;
    }

    @Override
    public void deleteCategory(Long id) {
        log.info("Deleting category with id: {}", id);
        Category category = getCategoryById(id);
        category.setActive(false);
        categoryRepository.save(category);
    }

    @Override
    public List<CategoryBrandResponse> getAllCategoryWithBrands() {
        return categoryBrandRepository.findAll()
                .stream()
                .map(CategoryBrandResponse::convertEntityToResponse)
                .toList();
    }

}
