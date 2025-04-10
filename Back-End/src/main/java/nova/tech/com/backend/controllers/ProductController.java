package nova.tech.com.backend.controllers;

import lombok.RequiredArgsConstructor;
import nova.tech.com.backend.dtos.response.PageResponse;
import nova.tech.com.backend.dtos.response.SuccessResponse;
import nova.tech.com.backend.services.product.ProductService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import static org.springframework.http.HttpStatus.*;

@RestController
@RequestMapping("${api.prefix}/products")
@RequiredArgsConstructor
public class ProductController {
    private final ProductService productService;


    @GetMapping("/search-product")
    public ResponseEntity<SuccessResponse> searchProduct(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "10") int limit,
            @RequestParam(required = false) String brand,
            @RequestParam(required = false) String category,
            @RequestParam(required = false) String[] search,
            @RequestParam(defaultValue = "true") boolean active,
            @RequestParam(required = false) String... sort

    ){
        PageResponse pageResponse
                = productService.searchProduct(page, limit, brand,category, search, active, sort);
        return ResponseEntity.ok().body(
                new SuccessResponse(
                        "Product search successfully",
                        OK,
                        pageResponse
                )
        );
    }

    @GetMapping("/top-10-products-by-category/{cid}")
    public ResponseEntity<SuccessResponse> getTop10ProductsByCategory(
            @PathVariable Long cid
    ){
        return ResponseEntity.ok().body(
                new SuccessResponse(
                        "Get top 10 products by category successfully",
                        OK,
                        productService.getTop10ProductsByCategory(cid)
                )
        );
    }
}
