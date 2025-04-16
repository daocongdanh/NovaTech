package nova.tech.com.backend.controllers;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import nova.tech.com.backend.dtos.request.CategoryAttributeRequest;
import nova.tech.com.backend.dtos.response.SuccessResponse;
import nova.tech.com.backend.services.categoryattribute.CategoryAttributeService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import static org.springframework.http.HttpStatus.*;

@RestController
@RequestMapping("${api.prefix}/category-attributes")
@RequiredArgsConstructor
public class CategoryAttributeController {
    private final CategoryAttributeService categoryAttributeService;


    @GetMapping("")
    public ResponseEntity<SuccessResponse> getAllCategoryAttributes(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "10") int limit
    ){
        return ResponseEntity.ok().body(
                new SuccessResponse(
                        "Category attributes retrieved successfully",
                        OK,
                        categoryAttributeService.getAllCategoryAttributes(page, limit)
                )
        );
    }

     @PostMapping("")
     public ResponseEntity<SuccessResponse> createCategoryAttribute(
             @Valid @RequestBody CategoryAttributeRequest categoryAttributeRequest
     ) {
         categoryAttributeService.createCategoryAttribute(categoryAttributeRequest);
         return ResponseEntity.status(CREATED).body(
                 new SuccessResponse(
                         "Category attribute created successfully",
                         CREATED,
                         null
                 )
         );
     }

     @DeleteMapping("/{id}")
     public ResponseEntity<SuccessResponse> deleteCategoryAttribute(
             @PathVariable Long id
     ) {
        categoryAttributeService.deleteCategoryAttribute(id);
        return ResponseEntity.status(NO_CONTENT).body(
                new SuccessResponse(
                        "Category attribute deleted successfully",
                        NO_CONTENT,
                        null
                )
        );
     }

}
