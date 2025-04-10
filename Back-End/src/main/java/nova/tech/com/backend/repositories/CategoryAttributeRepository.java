package nova.tech.com.backend.repositories;

import nova.tech.com.backend.models.Category;
import nova.tech.com.backend.models.CategoryAttribute;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CategoryAttributeRepository extends JpaRepository<CategoryAttribute, Long> {

    List<CategoryAttribute> findAllByCategory(Category category);

}
