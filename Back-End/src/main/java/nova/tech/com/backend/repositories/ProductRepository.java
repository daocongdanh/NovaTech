package nova.tech.com.backend.repositories;

import nova.tech.com.backend.models.Brand;
import nova.tech.com.backend.models.Category;
import nova.tech.com.backend.models.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findTop5ByCategoryAndActiveOrderByViewCountDesc(Category category, boolean active);

    boolean existsByName(String name);
    boolean existsByNameAndIdNot(String name, Long id);
    boolean existsByBrand(Brand brand);
    boolean existsByCategoryAndBrand(Category category, Brand brand);
    @Query(value = """
    SELECT * FROM products 
    WHERE category_id = :categoryId 
      AND active = true 
      AND slug <> :slug 
    ORDER BY RAND() 
    LIMIT 10
    """, nativeQuery = true)
    List<Product> findRandom10ByCategoryIdAndNotProductId(@Param("categoryId") Long categoryId,
                                                          @Param("slug") String slug);
    Optional<Product> findBySlug(String slug);

}
