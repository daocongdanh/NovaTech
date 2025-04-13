package nova.tech.com.backend.repositories;

import nova.tech.com.backend.models.Product;
import nova.tech.com.backend.models.ProductImage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ProductImageRepository extends JpaRepository<ProductImage, Long> {
    Optional<ProductImage> findByProductAndId(Product product, Long id);
}
