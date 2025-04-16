package nova.tech.com.backend.repositories;

import nova.tech.com.backend.models.Attribute;
import nova.tech.com.backend.models.Category;
import nova.tech.com.backend.models.Product;
import nova.tech.com.backend.models.ProductAttributeValue;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProductAttributeValueRepository extends JpaRepository<ProductAttributeValue, Long> {
    List<ProductAttributeValue> findAllByAttribute(Attribute attribute);
    List<ProductAttributeValue> findAllByProduct(Product product);
    void deleteAllByProduct(Product product);
    Optional<ProductAttributeValue> findByProductAndAttribute(Product product, Attribute attribute);
    boolean existsByAttribute(Attribute attribute);

    @Query("""
    SELECT CASE WHEN COUNT(pav) > 0 THEN true ELSE false END
    FROM ProductAttributeValue pav
    WHERE pav.attribute = :attribute
      AND pav.product.category = :category
    """)
    boolean existsByCategoryAndAttribute(@Param("category") Category category,
                                         @Param("attribute") Attribute attribute);
}
