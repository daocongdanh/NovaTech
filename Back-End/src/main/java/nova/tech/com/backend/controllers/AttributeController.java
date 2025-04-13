package nova.tech.com.backend.controllers;


import lombok.RequiredArgsConstructor;
import nova.tech.com.backend.dtos.request.AttributeRequest;
import nova.tech.com.backend.dtos.response.SuccessResponse;
import nova.tech.com.backend.services.attribute.AttributeService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import static org.springframework.http.HttpStatus.*;

@RestController
@RequestMapping("${api.prefix}/attributes")
@RequiredArgsConstructor
public class AttributeController {
    private final AttributeService attributeService;

    @GetMapping("/{id}")
    public ResponseEntity<SuccessResponse> getAttributeById(@PathVariable("id") long id){
        return ResponseEntity.ok().body(
                new SuccessResponse(
                        "Get attribute by id successfully",
                        OK,
                        attributeService.getAttributeById(id)
                )
        );
    }

    @GetMapping("")
    public ResponseEntity<SuccessResponse> getAllAttributes(
            @RequestParam(value = "category", required = false) String categorySlug,
            @RequestParam(value = "brand", required = false) String brandName){
        return ResponseEntity.ok().body(
                new SuccessResponse(
                        "Get all attributes successfully",
                        OK,
                        attributeService.getAllAttributes(categorySlug, brandName)
                )
        );
    }

    @GetMapping("/category/{slug}")
    public ResponseEntity<SuccessResponse> getAttributeByCategory(@PathVariable("slug") String slug){
        return ResponseEntity.ok().body(
                new SuccessResponse(
                        "Get attribute by category successfully",
                        OK,
                        attributeService.getAttributeByCategory(slug)
                )
        );
    }

    @PostMapping("")
    public ResponseEntity<SuccessResponse> createAttribute(@RequestBody AttributeRequest attributeRequest){
        attributeService.createAttribute(attributeRequest);
        return ResponseEntity.status(CREATED).body(
                new SuccessResponse(
                        "Create attribute successfully",
                        CREATED,
                        null
                )
        );
    }

    @PutMapping("/{id}")
    public ResponseEntity<SuccessResponse> updateAttribute(
            @PathVariable("id") long id,
            @RequestBody AttributeRequest attributeRequest){
        attributeService.updateAttribute(id, attributeRequest);
        return ResponseEntity.status(OK).body(
                new SuccessResponse(
                        "Update attribute successfully",
                        OK,
                        null
                )
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<SuccessResponse> deleteAttribute(@PathVariable("id") long id){
        attributeService.deleteAttribute(id);
        return ResponseEntity.status(NO_CONTENT).body(
                new SuccessResponse(
                        "Delete attribute successfully",
                        NO_CONTENT,
                        null
                )
        );
    }

    @GetMapping("/pagination")
    public ResponseEntity<SuccessResponse> getAllAttributesWithPagination(
            @RequestParam(value = "page", defaultValue = "1") int page,
            @RequestParam(value = "limit", defaultValue = "10") int limit) {
        return ResponseEntity.ok().body(
                new SuccessResponse(
                        "Get all attributes with pagination successfully",
                        OK,
                        attributeService.getAllAttributesWithPagination(page, limit)
                )
        );
    }

}
