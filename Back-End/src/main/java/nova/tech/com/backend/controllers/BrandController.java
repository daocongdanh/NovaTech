package nova.tech.com.backend.controllers;

import lombok.RequiredArgsConstructor;
import nova.tech.com.backend.dtos.request.BrandRequest;
import nova.tech.com.backend.dtos.response.SuccessResponse;
import nova.tech.com.backend.services.brand.BrandService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import static org.springframework.http.HttpStatus.*;

@RestController
@RequestMapping("${api.prefix}/brands")
@RequiredArgsConstructor
public class BrandController {
    private final BrandService brandService;

    @GetMapping("/{id}")
    public ResponseEntity<SuccessResponse> getBrandById(@PathVariable("id") long id){
        return ResponseEntity.ok().body(
                new SuccessResponse(
                        "Get brand by id successfully",
                        OK,
                        brandService.getBrandById(id)
                )
        );
    }

    @GetMapping("")
    public ResponseEntity<SuccessResponse> getAllBrands(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "10") int limit
    ){
        return ResponseEntity.ok().body(
                new SuccessResponse(
                        "Get all brands successfully",
                        OK,
                        brandService.getAllBrands(page, limit)
                )
        );
    }

    @GetMapping("/category/{slug}")
    public ResponseEntity<SuccessResponse> getBrandByCategory(@PathVariable("slug") String slug){
        return ResponseEntity.ok().body(
                new SuccessResponse(
                        "Get brand by category successfully",
                        OK,
                        brandService.getBrandByCategory(slug)
                )
        );
    }

    @PostMapping("")
    public ResponseEntity<SuccessResponse> createBrand(
            @RequestBody BrandRequest brandRequest
    ){
        brandService.createBrand(brandRequest);
        return ResponseEntity.ok().body(
                new SuccessResponse(
                        "Create brand successfully",
                        CREATED,
                        null
                )
        );
    }

    @PutMapping("/{id}")
    public ResponseEntity<SuccessResponse> updateBrand(
            @PathVariable("id") long id,
            @RequestBody BrandRequest brandRequest
    ){
        brandService.updateBrand(id, brandRequest);
        return ResponseEntity.ok().body(
                new SuccessResponse(
                        "Update brand successfully",
                        OK,
                        null
                )
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<SuccessResponse> deleteBrand(
            @PathVariable("id") long id
    ){
        brandService.deleteBrand(id);
        return ResponseEntity.ok().body(
                new SuccessResponse(
                        "Delete brand successfully",
                        OK,
                        null
                )
        );
    }
}
