package nova.tech.com.backend.repositories;

import nova.tech.com.backend.models.Brand;
import nova.tech.com.backend.models.Category;
import nova.tech.com.backend.models.CategoryBrand;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CategoryBrandRepository extends JpaRepository<CategoryBrand, Long> {
    List<CategoryBrand> findAllByCategory(Category category);
    boolean existsByBrand(Brand brand);
    boolean existsByCategoryAndBrand(Category category, Brand brand);
}
