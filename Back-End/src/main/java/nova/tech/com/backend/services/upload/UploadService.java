package nova.tech.com.backend.services.upload;

import nova.tech.com.backend.dtos.request.UploadRequest;

import java.util.List;

public interface UploadService {
    List<String> upload(UploadRequest uploadRequest);
    void delete(String imageUrl);
}
