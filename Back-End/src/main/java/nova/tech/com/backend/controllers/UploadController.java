package nova.tech.com.backend.controllers;

import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import nova.tech.com.backend.dtos.request.UploadRequest;
import nova.tech.com.backend.dtos.response.SuccessResponse;
import nova.tech.com.backend.services.upload.UploadService;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import static org.springframework.http.HttpStatus.*;

@RestController
@RequestMapping("${api.prefix}/uploads")
@RequiredArgsConstructor
public class UploadController {

    private final UploadService uploadService;

    @Operation(summary = "Upload File")
    @PostMapping(value = "", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<SuccessResponse> upload(@ModelAttribute UploadRequest uploadRequest) {
        return ResponseEntity.ok().body(
                new SuccessResponse(
                        "Upload successfully",
                        CREATED,
                        uploadService.upload(uploadRequest)
                )
        );
    }
}
