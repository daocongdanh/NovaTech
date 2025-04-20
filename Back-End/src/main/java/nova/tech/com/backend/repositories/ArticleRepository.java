package nova.tech.com.backend.repositories;

import nova.tech.com.backend.models.Article;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ArticleRepository extends JpaRepository<Article, Long> {
    Page<Article> findAllByActive(Boolean active, Pageable pageable);
    boolean existsByTitle(String title);
    boolean existsByTitleAndIdNot(String title, Long id);
    Optional<Article> findBySlug(String slug);
    List<Article> findTop4ByActiveTrueOrderByCreatedAtDesc();
}
