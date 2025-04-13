package nova.tech.com.backend.controllers;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import nova.tech.com.backend.dtos.request.CategoryRequest;
import nova.tech.com.backend.dtos.response.SuccessResponse;
import nova.tech.com.backend.services.category.CategoryService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import static org.springframework.http.HttpStatus.*;

@RestController
@RequestMapping("${api.prefix}/categories")
@RequiredArgsConstructor
@Tag(name = "Category Controller")
public class CategoryController {
    private final CategoryService categoryService;

    @Operation(summary = "Create category")
    @PostMapping("")
    public ResponseEntity<SuccessResponse> createCategory(@Valid @RequestBody CategoryRequest categoryRequest){
        return ResponseEntity.ok().body(
                new SuccessResponse(
                        "Category created successfully",
                        CREATED,
                        categoryService.createCategory(categoryRequest)
                )
        );
    }

    @Operation(summary = "Get all categories")
    @GetMapping("")
    public ResponseEntity<SuccessResponse> getAllCategories(@RequestParam(required = false) Boolean active){
        return ResponseEntity.ok().body(
                new SuccessResponse(
                        "Categories retrieved successfully",
                        OK,
                        categoryService.getAllCategories(active)
                )
        );
    }

    @Operation(summary = "Get category by id")
    @GetMapping("/{id}")
    public ResponseEntity<SuccessResponse> getCategoryById(@PathVariable Long id){
        return ResponseEntity.ok().body(
                new SuccessResponse(
                        "Get category by id successfully",
                        OK,
                        categoryService.getCategoryById(id)
                )
        );
    }

//    @Operation(summary = "Get category by slug")
//    @GetMapping("/slug/{slug}")
//    public ResponseEntity<SuccessResponse> getCategoryBySlug(@PathVariable String slug){
//        return ResponseEntity.ok().body(
//                new SuccessResponse(
//                        "Get category by slug successfully",
//                        OK,
//                        categoryService.getCategoryBySlug(slug)
//                )
//        );
//    }

    @Operation(summary = "Update category")
    @PutMapping("/{id}")
    public ResponseEntity<SuccessResponse> updateCategory(@PathVariable Long id, @Valid @RequestBody CategoryRequest categoryRequest){
        return ResponseEntity.ok().body(
                new SuccessResponse(
                        "Category updated successfully",
                        OK,
                        categoryService.updateCategory(id, categoryRequest)
                )
        );
    }

    @Operation(summary = "Delete category")
    @DeleteMapping("/{id}")
    public ResponseEntity<SuccessResponse> deleteCategory(@PathVariable Long id){
        categoryService.deleteCategory(id);
        return ResponseEntity.ok().body(
                new SuccessResponse(
                        "Category deleted successfully",
                        OK,
                        null
                )
        );
    }


    @Operation(summary = "Get all categories with brands")
    @GetMapping("/brands")
    public ResponseEntity<SuccessResponse> getAllCategoryWithBrands(){
        return ResponseEntity.ok().body(
                new SuccessResponse(
                        "Get all categories with brands successfully",
                        OK,
                        categoryService.getAllCategoryWithBrands()
                )
        );
    }
}
