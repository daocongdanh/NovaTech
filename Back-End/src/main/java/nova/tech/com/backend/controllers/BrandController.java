package nova.tech.com.backend.controllers;

import lombok.RequiredArgsConstructor;
import nova.tech.com.backend.dtos.response.SuccessResponse;
import nova.tech.com.backend.services.brand.BrandService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
    public ResponseEntity<SuccessResponse> getAllBrands(){
        return ResponseEntity.ok().body(
                new SuccessResponse(
                        "Get all brands successfully",
                        OK,
                        brandService.getAllBrands()
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
}
