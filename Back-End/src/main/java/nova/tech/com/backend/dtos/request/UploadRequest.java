package nova.tech.com.backend.dtos.request;
import lombok.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Getter
@Setter
public class UploadRequest {
    private List<MultipartFile> files;
}