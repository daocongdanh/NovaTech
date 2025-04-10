package nova.tech.com.backend.repositories;

import nova.tech.com.backend.models.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {
    List<Category> findAllByActive(Boolean active);
    boolean existsByName(String name);
    boolean existsByNameAndIdNot(String name, Long id);
//    Optional<Category> findBySlug(String slug);

    Optional<Category> findByName(String name);
    Optional<Category> findBySlug(String slug);
}
