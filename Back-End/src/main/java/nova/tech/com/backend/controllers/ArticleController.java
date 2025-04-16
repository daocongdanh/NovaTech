package nova.tech.com.backend.controllers;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import nova.tech.com.backend.dtos.request.ArticleRequest;
import nova.tech.com.backend.dtos.response.SuccessResponse;
import nova.tech.com.backend.services.article.ArticleService;
import static org.springframework.http.HttpStatus.*;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("${api.prefix}/articles")
@RequiredArgsConstructor
public class ArticleController {
    private final ArticleService articleService;

    @GetMapping("")
    public ResponseEntity<SuccessResponse> getAllArticles(
            @RequestParam(value = "page", defaultValue = "1") int page,
            @RequestParam(value = "limit", defaultValue = "10") int limit,
            @RequestParam(value = "active", required = false) Boolean active) {
        return ResponseEntity.ok().body(
                new SuccessResponse(
                        "Get all articles successfully",
                        OK,
                        articleService.getAllArticles(page, limit, active)
                )
        );
    }

    @PostMapping("")
    public ResponseEntity<SuccessResponse> createArticle(@Valid  @RequestBody ArticleRequest articleRequest) {
        articleService.createArticle(articleRequest);
        return ResponseEntity.status(CREATED).body(
                new SuccessResponse(
                        "Create article successfully",
                        CREATED,
                        null
                )
        );
    }

    @PutMapping("/{id}")
    public ResponseEntity<SuccessResponse> updateArticle(
            @PathVariable("id") Long id,
            @Valid @RequestBody ArticleRequest articleRequest) {
        articleService.updateArticle(id, articleRequest);
        return ResponseEntity.status(OK).body(
                new SuccessResponse(
                        "Update article successfully",
                        OK,
                        null
                )
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<SuccessResponse> getArticleById(@PathVariable("id") Long id) {
        return ResponseEntity.ok().body(
                new SuccessResponse(
                        "Get article successfully",
                        OK,
                        articleService.getArticleById(id)
                )
        );
    }

    @GetMapping("/slug/{slug}")
    public ResponseEntity<SuccessResponse> getArticleBySlug(@PathVariable("slug") String slug) {
        return ResponseEntity.ok().body(
                new SuccessResponse(
                        "Get article successfully",
                        OK,
                        articleService.getArticleBySlug(slug)
                )
        );
    }
}
