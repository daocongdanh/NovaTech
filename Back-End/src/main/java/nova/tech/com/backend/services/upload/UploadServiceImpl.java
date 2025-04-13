package nova.tech.com.backend.services.upload;

import nova.tech.com.backend.dtos.request.UploadRequest;
import nova.tech.com.backend.exceptions.InvalidFileTypeException;
import nova.tech.com.backend.exceptions.InvalidParamException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;

@Service
public class UploadServiceImpl implements UploadService{
    public static final String UPLOAD_FOLDER = "uploads";

    @Value("${base-url}")
    private String baseUrl;
    @Override
    public List<String> upload(UploadRequest uploadRequest) {
        List<MultipartFile> files = uploadRequest.getFiles();
        List<String> list = new ArrayList<>();
        if(files == null)
            return list;
        isFileValid(files);

        ExecutorService executorService = Executors.newFixedThreadPool(files.size());
        List<Future<String>> futures = new ArrayList<>();

        for (MultipartFile file : files) {
            Future<String> future = executorService.submit(() -> {
                try {
                    String newFileName = UUID.randomUUID() + getFileExtension(file.getOriginalFilename());
                    Path uploadPath = Paths.get(UPLOAD_FOLDER).resolve(newFileName);
                    Files.copy(file.getInputStream(), uploadPath);
                    return uploadPath.toString();
                } catch (Exception e) {
                    throw new RuntimeException(e.getMessage());
                }
            });
            futures.add(future);
        }

        for (Future<String> future : futures) {
            try {
                list.add(baseUrl + future.get());
            } catch (InterruptedException | ExecutionException e) {
                throw new RuntimeException(e.getMessage());
            }
        }

        executorService.shutdown();

        return list;
    }

    @Override
    public void delete(String imageUrl) {
        if (imageUrl == null || imageUrl.isEmpty()) return;

        try {
            String relativePath = imageUrl.replace(baseUrl, "").replace("\\", "/");

            String fileName = Paths.get(relativePath).getFileName().toString();

            Path fullPath = Paths.get(UPLOAD_FOLDER).resolve(fileName);

            if (Files.exists(fullPath)) {
                Files.delete(fullPath);
                System.out.println("Deleted file: " + fullPath);
            }
        } catch (Exception e) {
            throw new RuntimeException("Error deleting file: " + e.getMessage());
        }
    }



    private void isFileValid(List<MultipartFile> files) {
        if (files.size() > 6) {
            throw new InvalidParamException("Only upload up to 4 files.");
        }
        for (MultipartFile file : files) {
            if (file != null) {
                String originalFilename = file.getOriginalFilename();
                List<String> allowedExtensions = List.of(".png", ".jpg", ".jpeg");
                if (allowedExtensions.stream().noneMatch(originalFilename::endsWith)) {
                    throw new InvalidFileTypeException("Invalid file type.");
                }
            }
        }
    }

    private String getFileExtension(String fileName) {
        return fileName.lastIndexOf(".") > 0 ? fileName.substring(fileName.lastIndexOf(".")) : "";
    }
}
