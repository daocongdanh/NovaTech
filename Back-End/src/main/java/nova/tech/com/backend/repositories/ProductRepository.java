package nova.tech.com.backend.repositories;

import nova.tech.com.backend.models.Category;
import nova.tech.com.backend.models.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findTop10ByCategoryAndActiveOrderByViewCountDesc(Category category, boolean active);

}
