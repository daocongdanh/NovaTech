package nova.tech.com.backend.repositories;

import nova.tech.com.backend.models.Attribute;
import nova.tech.com.backend.models.Product;
import nova.tech.com.backend.models.ProductAttributeValue;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductAttributeValueRepository extends JpaRepository<ProductAttributeValue, Long> {
    List<ProductAttributeValue> findAllByAttribute(Attribute attribute);
    List<ProductAttributeValue> findAllByProduct(Product product);
}
