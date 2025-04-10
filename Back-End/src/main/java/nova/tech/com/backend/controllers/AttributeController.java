package nova.tech.com.backend.controllers;


import lombok.RequiredArgsConstructor;
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
}
