package nova.tech.com.backend.services.article;

import nova.tech.com.backend.dtos.request.ArticleRequest;
import nova.tech.com.backend.dtos.response.PageResponse;
import nova.tech.com.backend.models.Article;

public interface ArticleService {
    PageResponse getAllArticles(int page, int limit, Boolean active);
    void createArticle(ArticleRequest articleRequest);
    void updateArticle(Long id, ArticleRequest articleRequest);
    Article getArticleById(Long id);
    Article getArticleBySlug(String slug);

}
