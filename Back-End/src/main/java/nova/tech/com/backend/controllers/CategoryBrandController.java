package nova.tech.com.backend.controllers;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import nova.tech.com.backend.dtos.request.CategoryBrandRequest;
import nova.tech.com.backend.dtos.response.SuccessResponse;
import nova.tech.com.backend.services.categorybrand.CategoryBrandService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import static org.springframework.http.HttpStatus.*;


@RestController
@RequestMapping("${api.prefix}/category-brands")
@RequiredArgsConstructor
public class CategoryBrandController {
     private final CategoryBrandService categoryBrandService;

     @GetMapping("")
     public ResponseEntity<SuccessResponse> getAllCategoryBrands(
             @RequestParam(defaultValue = "1") int page,
             @RequestParam(defaultValue = "10") int limit
     ){
         return ResponseEntity.ok().body(
                 new SuccessResponse(
                         "Category brands retrieved successfully",
                         OK,
                         categoryBrandService.getAllCategoryBrands(page, limit)
                 )
         );
     }
    @PostMapping("")
    public ResponseEntity<SuccessResponse> createCategoryBrand(
            @Valid @RequestBody CategoryBrandRequest categoryBrandRequest
    ) {
        categoryBrandService.createCategoryBrand(categoryBrandRequest);
        return ResponseEntity.status(CREATED).body(
                new SuccessResponse(
                        "Category brand created successfully",
                        CREATED,
                        null
                )
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<SuccessResponse> deleteCategoryBrand(
            @PathVariable Long id
    ) {
        categoryBrandService.deleteCategoryBrand(id);
        return ResponseEntity.status(NO_CONTENT).body(
                new SuccessResponse(
                        "Category brand deleted successfully",
                        NO_CONTENT,
                        null
                )
        );
    }
}
