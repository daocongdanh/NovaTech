package nova.tech.com.backend.services.product;

import lombok.RequiredArgsConstructor;
import nova.tech.com.backend.dtos.request.AttributeForProductRequest;
import nova.tech.com.backend.dtos.request.ProductRequest;
import nova.tech.com.backend.dtos.response.PageResponse;
import nova.tech.com.backend.dtos.response.ProductResponse;
import nova.tech.com.backend.exceptions.ConflictException;
import nova.tech.com.backend.exceptions.ResourceNotFoundException;
import nova.tech.com.backend.models.*;
import nova.tech.com.backend.repositories.*;
import nova.tech.com.backend.services.upload.UploadService;
import nova.tech.com.backend.utils.StringUtil;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService{
    private final SearchRepository searchRepository;
    private final CategoryRepository categoryRepository;
    private final ProductRepository productRepository;
    private final BrandRepository brandRepository;
    private final AttributeRepository attributeRepository;
    private final ProductAttributeValueRepository productAttributeValueRepository;
    private final ProductImageRepository productImageRepository;
    private final UploadService uploadService;
    @Override
    public PageResponse searchProduct(int page, int limit, String brand, String category, String[] search, boolean active, String... sort) {
        return searchRepository.searchProduct(page, limit, brand, category, search, active, sort);
    }

    @Override
    public List<ProductResponse> getTop10ProductsByCategory(Long cid) {
        Category category = categoryRepository.findById(cid)
                .orElseThrow(() -> new ResourceNotFoundException("Category not found with id: " + cid));

        return productRepository.findTop5ByCategoryAndActiveOrderByViewCountDesc(category, true)
                .stream()
                .map(product -> ProductResponse.convertEntityToResponse(
                        product, null))
                .toList();
    }

    @Override
    public ProductResponse getProductById(Long id) {
        return productRepository.findById(id)
                .map(product -> ProductResponse.convertEntityToResponse(
                        product, product.getProductAttributeValues()))
                .orElseThrow(() -> new ResourceNotFoundException("Product not found with id: " + id));
    }

    @Override
    public PageResponse getAllProducts(int page, int limit) {
        page = Math.max(page - 1, 0);
        Pageable pageable = PageRequest.of(page, limit);
        Page<Product> productPage = productRepository.findAll(pageable);
        return PageResponse.builder()
                .page(page + 1)
                .limit(limit)
                .totalPage(productPage.getTotalPages())
                .totalItem((int) productPage.getTotalElements())
                .result(productPage.getContent().stream().map(product ->
                        ProductResponse.convertEntityToResponse(
                                product, null))
                        .toList())
                .build();
    }

    @Override
    @Transactional
    public void createProduct(ProductRequest productRequest) {
        Category category = categoryRepository.findBySlug(productRequest.getCategorySlug())
                .orElseThrow(() -> new ResourceNotFoundException("Category not found with slug: " + productRequest.getCategorySlug()));
        Brand brand = brandRepository.findById(productRequest.getBrandId())
                .orElseThrow(() -> new ResourceNotFoundException("Brand not found with id: " + productRequest.getBrandId()));
        if (productRepository.existsByName(productRequest.getName())) {
            throw new ConflictException("Product with name '" + productRequest.getName() + "' already exists");
        }

        Product product = Product.builder()
                .name(productRequest.getName())
                .slug(StringUtil.normalizeString(productRequest.getName()))
                .thumbnail(productRequest.getThumbnail())
                .oldPrice(productRequest.getOldPrice())
                .newPrice(productRequest.getNewPrice())
                .discount((int) (((double)(productRequest.getOldPrice() - productRequest.getNewPrice())
                        / productRequest.getOldPrice()) * 100))
                .viewCount(0)
                .note(productRequest.getNote())
                .description(productRequest.getDescription())
                .quantity(productRequest.getQuantity())
                .active(productRequest.isActive())
                .category(category)
                .brand(brand)
                .build();

        productRepository.save(product);

        for(String image : productRequest.getImages()){
            ProductImage productImage = ProductImage.builder()
                    .imageUrl(image)
                    .product(product)
                    .build();
            productImageRepository.save(productImage);
        }
        for(AttributeForProductRequest attribute : productRequest.getAttributes()){
            Attribute attributeEntity = attributeRepository.findById(attribute.getAttributeId())
                    .orElseThrow(() -> new ResourceNotFoundException("Attribute not found with id: " + attribute.getAttributeId()));
            ProductAttributeValue productAttributeValue = ProductAttributeValue.builder()
                    .value(attribute.getValue())
                    .slug(StringUtil.normalizeString(attribute.getValue()))
                    .product(product)
                    .attribute(attributeEntity)
                    .build();
            productAttributeValueRepository.save(productAttributeValue);
        }
    }

    @Override
    public void deleteImageProduct(Long productId, Long imageId) {

        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found with id: " + productId));

        ProductImage productImage = productImageRepository.findByProductAndId(product, imageId)
                .orElseThrow(() -> new ResourceNotFoundException("Product image not found with id: " + imageId));

        productImageRepository.delete(productImage);
        uploadService.delete(productImage.getImageUrl());
    }

    @Override
    public void addImageProduct(Long productId, String imageUrl) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found with id: " + productId));
        ProductImage productImage = ProductImage.builder()
                .imageUrl(imageUrl)
                .product(product)
                .build();
        productImageRepository.save(productImage);
    }

    @Override
    @Transactional
    public void updateProduct(Long id, ProductRequest productRequest) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found with id: " + id));
        Category category = categoryRepository.findBySlug(productRequest.getCategorySlug())
                .orElseThrow(() -> new ResourceNotFoundException("Category not found with slug: " + productRequest.getCategorySlug()));
        Brand brand = brandRepository.findById(productRequest.getBrandId())
                .orElseThrow(() -> new ResourceNotFoundException("Brand not found with id: " + productRequest.getBrandId()));
        if (productRepository.existsByNameAndIdNot(productRequest.getName(), id)) {
            throw new ConflictException("Product with name '" + productRequest.getName() + "' already exists");
        }
        String oldThumbnailPath = product.getThumbnail();
        String newThumbnailPath = productRequest.getThumbnail();
        if (oldThumbnailPath != null && !oldThumbnailPath.equals(newThumbnailPath)) {
            uploadService.delete(oldThumbnailPath);
        }

        boolean isCategoryUnchanged = category.getId().equals(product.getCategory().getId());
        product.setName(productRequest.getName());
        product.setSlug(StringUtil.normalizeString(productRequest.getName()));
        product.setThumbnail(newThumbnailPath);
        product.setOldPrice(productRequest.getOldPrice());
        product.setNewPrice(productRequest.getNewPrice());
        product.setDiscount((int) (((double)(productRequest.getOldPrice() - productRequest.getNewPrice())
                / productRequest.getOldPrice()) * 100));
        product.setNote(productRequest.getNote());
        product.setDescription(productRequest.getDescription());
        product.setQuantity(productRequest.getQuantity());
        product.setActive(productRequest.isActive());
        product.setCategory(category);
        product.setBrand(brand);
        productRepository.save(product);
        if(!isCategoryUnchanged){
            productAttributeValueRepository.deleteAllByProduct(product);
        }

        for (AttributeForProductRequest attribute : productRequest.getAttributes()) {
            Attribute attributeEntity = attributeRepository.findById(attribute.getAttributeId())
                    .orElseThrow(() -> new ResourceNotFoundException("Attribute not found with id: " + attribute.getAttributeId()));
            ProductAttributeValue productAttributeValue = productAttributeValueRepository.findByProductAndAttribute(product, attributeEntity)
                    .orElseGet(() -> ProductAttributeValue.builder()
                            .product(product)
                            .attribute(attributeEntity)
                            .build());
            if (!Objects.equals(attribute.getValue(), productAttributeValue.getValue())) {
                productAttributeValue.setValue(attribute.getValue());
                productAttributeValue.setSlug(StringUtil.normalizeString(attribute.getValue()));
            }
            productAttributeValueRepository.save(productAttributeValue);
        }
    }

    @Override
    public List<ProductResponse> getRandom10Products(String slug) {
        Product product = productRepository.findBySlug(slug)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found with slug: " + slug));
        return productRepository.findRandom10ByCategoryIdAndNotProductId(product.getCategory().getId(), slug)
                .stream()
                .map(p -> ProductResponse.convertEntityToResponse(
                        p, null))
                .toList();
    }

    @Override
    public ProductResponse getProductBySlug(String slug) {
        return productRepository.findBySlug(slug)
                .map(product -> ProductResponse.convertEntityToResponse(
                        product, product.getProductAttributeValues()))
                .orElseThrow(() -> new ResourceNotFoundException("Product not found with slug: " + slug));
    }
}
