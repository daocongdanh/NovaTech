package nova.tech.com.backend.controllers;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import nova.tech.com.backend.dtos.request.ProductRequest;
import nova.tech.com.backend.dtos.response.PageResponse;
import nova.tech.com.backend.dtos.response.SuccessResponse;
import nova.tech.com.backend.services.product.ProductService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

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

    @GetMapping("/{id}")
    public ResponseEntity<SuccessResponse> getProductById(
            @PathVariable Long id
    ){
        return ResponseEntity.ok().body(
                new SuccessResponse(
                        "Get product by id successfully",
                        OK,
                        productService.getProductById(id)
                )
        );
    }

    @GetMapping("/slug/{slug}")
    public ResponseEntity<SuccessResponse> getProductBySlug(
            @PathVariable String slug
    ){
        return ResponseEntity.ok().body(
                new SuccessResponse(
                        "Get product by slug successfully",
                        OK,
                        productService.getProductBySlug(slug)
                )
        );
    }

    @GetMapping("")
    public ResponseEntity<SuccessResponse> getAllProducts(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "10") int limit
    ){
        return ResponseEntity.ok().body(
                new SuccessResponse(
                        "Get all products successfully",
                        OK,
                        productService.getAllProducts(page, limit)
                )
        );
    }

    @PostMapping("")
    public ResponseEntity<SuccessResponse> createProduct(
          @Valid @RequestBody ProductRequest productRequest
    ) {
        productService.createProduct(productRequest);
        return ResponseEntity.ok().body(
                new SuccessResponse(
                        "Create product successfully",
                        CREATED,
                        null
                )
        );
    }

    @DeleteMapping("/delete-image/{productId}/{imageId}")
    public ResponseEntity<SuccessResponse> deleteImageProduct(
            @PathVariable Long productId,
            @PathVariable Long imageId
    ){
        productService.deleteImageProduct(productId, imageId);
        return ResponseEntity.ok().body(
                new SuccessResponse(
                        "Delete image product successfully",
                        OK,
                        null
                )
        );
    }

    @PostMapping("/add-image/{productId}")
    public ResponseEntity<SuccessResponse> addImageProduct(
            @PathVariable Long productId,
            @RequestBody Map<String, String> body
    ){
        productService.addImageProduct(productId, body.get("imageUrl"));
        return ResponseEntity.ok().body(
                new SuccessResponse(
                        "Add image product successfully",
                        OK,
                        null
                )
        );
    }

    @PutMapping("/{id}")
    public ResponseEntity<SuccessResponse> updateProduct(
            @PathVariable Long id,
            @Valid @RequestBody ProductRequest productRequest
    ){
        productService.updateProduct(id, productRequest);
        return ResponseEntity.ok().body(
                new SuccessResponse(
                        "Update product successfully",
                        OK,
                        null
                )
        );
    }

    @GetMapping("/random-products/{slug}")
    public ResponseEntity<SuccessResponse> getRandom10Products(
            @PathVariable String slug
    ){
        return ResponseEntity.ok().body(
                new SuccessResponse(
                        "Get random products successfully",
                        OK,
                        productService.getRandom10Products(slug)
                )
        );
    }
}
