package nova.tech.com.backend.dtos.response;
import lombok.*;
import org.springframework.data.domain.Page;

import java.util.function.Function;
@Getter
@Builder
public class PageResponse {
    private int page;
    private int limit;
    private int totalPage;
    private int totalItem;
    private Object result;
}