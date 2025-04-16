package nova.tech.com.backend.services.article;

import lombok.RequiredArgsConstructor;
import nova.tech.com.backend.dtos.request.ArticleRequest;
import nova.tech.com.backend.dtos.response.PageResponse;
import nova.tech.com.backend.exceptions.ConflictException;
import nova.tech.com.backend.exceptions.ResourceNotFoundException;
import nova.tech.com.backend.models.Article;
import nova.tech.com.backend.repositories.ArticleRepository;
import nova.tech.com.backend.services.upload.UploadService;
import nova.tech.com.backend.utils.StringUtil;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Service
@RequiredArgsConstructor
public class ArticleServiceImpl implements ArticleService{
    private final ArticleRepository articleRepository;
    private final UploadService uploadService;

    @Override
    public PageResponse getAllArticles(int page, int limit, Boolean active) {
        page = Math.max(page - 1, 0);
        Pageable pageable = PageRequest.of(page, limit);
        Page<Article> articlePage;
        if(active != null) {
            articlePage = articleRepository.findAllByActive(active, pageable);
        } else {
            articlePage = articleRepository.findAll(pageable);
        }
        return PageResponse.builder()
                .page(page + 1)
                .limit(limit)
                .totalPage(articlePage.getTotalPages())
                .totalItem((int) articlePage.getTotalElements())
                .result(articlePage.getContent().stream()
                        .toList())
                .build();
    }

    @Override
    public void createArticle(ArticleRequest articleRequest) {
        if(articleRepository.existsByTitle(articleRequest.getTitle())) {
            throw new ConflictException("Article with title " + articleRequest.getTitle() + " already exists");
        }
        Article article = Article.builder()
                .title(articleRequest.getTitle())
                .slug(StringUtil.normalizeString(articleRequest.getTitle()))
                .thumbnail(articleRequest.getThumbnail())
                .content(articleRequest.getContent())
                .createdAt(LocalDate.now())
                .active(true)
                .build();
        articleRepository.save(article);
    }

    @Override
    public void updateArticle(Long id, ArticleRequest articleRequest) {
        Article article = articleRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Article not found with id = " + id));
        if(articleRepository.existsByTitleAndIdNot(articleRequest.getTitle(), id)) {
            throw new ConflictException("Article with title " + articleRequest.getTitle() + " already exists");
        }
        String oldThumbnail = article.getThumbnail();
        String newThumbnail = articleRequest.getThumbnail();
        if(!newThumbnail.equals(oldThumbnail)) {
            uploadService.delete(oldThumbnail);
        }

        article.setTitle(articleRequest.getTitle());
        article.setSlug(StringUtil.normalizeString(articleRequest.getTitle()));
        article.setThumbnail(newThumbnail);
        article.setContent(articleRequest.getContent());
        article.setActive(articleRequest.isActive());
        articleRepository.save(article);
    }

    @Override
    public Article getArticleById(Long id) {
        return articleRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Article not found with id = " + id));
    }

    @Override
    public Article getArticleBySlug(String slug) {
        return articleRepository.findBySlug(slug)
                .orElseThrow(() -> new ResourceNotFoundException("Article not found with slug = " + slug));
    }

}
