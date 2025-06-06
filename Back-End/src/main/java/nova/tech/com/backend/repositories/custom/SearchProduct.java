package nova.tech.com.backend.repositories.custom;
import lombok.*;
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SearchProduct {
    private String key;
    private String operation; // :|>|<
    private Object value;
}
