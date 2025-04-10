package nova.tech.com.backend.repositories;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.criteria.*;
import lombok.RequiredArgsConstructor;
import nova.tech.com.backend.dtos.response.PageResponse;
import nova.tech.com.backend.dtos.response.ProductResponse;
import nova.tech.com.backend.exceptions.InvalidParamException;
import nova.tech.com.backend.exceptions.ResourceNotFoundException;
import nova.tech.com.backend.models.Brand;
import nova.tech.com.backend.models.Category;
import nova.tech.com.backend.models.Product;
import nova.tech.com.backend.models.ProductAttributeValue;
import org.hibernate.query.sqm.PathElementException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;
import org.springframework.util.StringUtils;

import java.lang.reflect.Field;
import java.util.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Repository
@RequiredArgsConstructor
public class SearchRepository {
    @PersistenceContext
    private EntityManager entityManager;
    private final ProductAttributeValueRepository productAttributeValueRepository;
    private final BrandRepository brandRepository;

    public PageResponse searchProduct(
            int page, int limit, String brand, String category, String[] search, boolean active,
            String... sort) {

        if (StringUtils.hasLength(brand) && brandRepository.findByName(brand).isEmpty()) {
            throw new ResourceNotFoundException("Brand not found with name: " + brand);
        }

        CriteriaBuilder builder = entityManager.getCriteriaBuilder();
        CriteriaQuery<Product> query = builder.createQuery(Product.class);
        Root<Product> pRoot = query.from(Product.class);

        // Danh sách field hợp lệ trong Product
        List<String> productFields = Arrays.stream(Product.class.getDeclaredFields())
                .map(Field::getName).toList();

        // Predicate & Order cho select
        List<Predicate> predicates = buildPredicates(builder, pRoot, brand, category, search, active, productFields);
        List<Order> orders = buildOrders(builder, pRoot, sort, productFields);

        query.select(pRoot).where(predicates.toArray(new Predicate[0])).orderBy(orders);

        // Count query
        CriteriaQuery<Long> countQuery = builder.createQuery(Long.class);
        Root<Product> countRoot = countQuery.from(Product.class);
        List<Predicate> countPredicates = buildPredicates(builder, countRoot, brand, category, search, active, productFields);

        countQuery.select(builder.countDistinct(countRoot)).where(countPredicates.toArray(new Predicate[0]));

        long totalItem = entityManager.createQuery(countQuery).getSingleResult();

        // Pagination
        page = Math.max(page - 1, 0);
        List<Product> products = entityManager.createQuery(query)
                .setFirstResult(page * limit)
                .setMaxResults(limit)
                .getResultList();

        Pageable pageable = PageRequest.of(page, limit);
        Page<Product> pageImpl = new PageImpl<>(products, pageable, totalItem);

        return PageResponse.builder()
                .page(page + 1)
                .limit(limit)
                .totalPage(pageImpl.getTotalPages())
                .totalItem((int) pageImpl.getTotalElements())
                .result(pageImpl.getContent().stream()
                        .map(product -> ProductResponse.convertEntityToResponse(product,
                                productAttributeValueRepository.findAllByProduct(product)))
                        .toList())
                .build();
    }

    private List<Predicate> buildPredicates(CriteriaBuilder builder, Root<Product> root,
                                            String brand, String category, String[] search, boolean active,
                                            List<String> productFields) {
        try {
            List<Predicate> predicates = new ArrayList<>();
            predicates.add(builder.equal(root.get("active"), active));

            if (StringUtils.hasLength(brand)) {
                Join<Product, Brand> bJoin = root.join("brand");
                predicates.add(builder.equal(bJoin.get("name"), brand));
            }

            if (StringUtils.hasLength(category)) {
                Join<Product, Category> cJoin = root.join("category");
                predicates.add(builder.equal(cJoin.get("slug"), category));
            }

            if (search != null) {
                for (String s : search) {
                    Pattern pattern = Pattern.compile("(.*)(:|>|<)(.*)");
                    Matcher matcher = pattern.matcher(s);
                    if (matcher.find()) {
                        String key = matcher.group(1).trim();
                        String operation = matcher.group(2);
                        String value = matcher.group(3).trim();

                        if (productFields.contains(key)) {
                            switch (operation) {
                                case ">" -> predicates.add(builder.greaterThanOrEqualTo(root.get(key), value));
                                case "<" -> predicates.add(builder.lessThanOrEqualTo(root.get(key), value));
                                case ":" -> predicates.add(builder.like(root.get(key), "%" + value + "%"));
                            }
                        } else {
                            Join<Product, ProductAttributeValue> paJoin = root.join("productAttributeValues");
                            predicates.add(builder.equal(paJoin.get("attribute").get("slug"), key));
                            predicates.add(builder.equal(paJoin.get("slug"), value));
                        }
                    }
                }
            }
            return predicates;
        } catch (PathElementException e) {
            throw new InvalidParamException(e.getMessage());
        }
    }

    private List<Order> buildOrders(CriteriaBuilder builder, Root<Product> root,
                                    String[] sort, List<String> productFields) {
        List<Order> orders = new ArrayList<>();
        if (sort != null) {
            for (String s : sort) {
                Pattern pattern = Pattern.compile("(.*):(asc|desc)", Pattern.CASE_INSENSITIVE);
                Matcher matcher = pattern.matcher(s);
                if (matcher.find()) {
                    String key = matcher.group(1).trim();
                    String direction = matcher.group(2).trim().toLowerCase();
                    if (productFields.contains(key)) {
                        orders.add(direction.equals("asc")
                                ? builder.asc(root.get(key))
                                : builder.desc(root.get(key)));
                    }
                }
            }
        }
        return orders;
    }
}
