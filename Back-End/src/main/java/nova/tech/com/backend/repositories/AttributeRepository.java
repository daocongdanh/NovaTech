package nova.tech.com.backend.repositories;

import nova.tech.com.backend.models.Attribute;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AttributeRepository extends JpaRepository<Attribute, Long> {
    boolean existsByLabel(String label);
    boolean existsByLabelAndIdNot(String label, long id);
}
