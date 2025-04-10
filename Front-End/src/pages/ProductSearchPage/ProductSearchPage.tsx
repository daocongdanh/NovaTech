import { useParams, useSearchParams } from "react-router";
import { useEffect, useMemo, useState } from "react";
import NavBrand from "@/components/NavBrand/NavBrand";
import ProductFilter from "@/components/ProductFilter/ProductFilter";
import ProductSort from "@/components/ProductSort/ProductSort";
import { getProduct } from "@/services/product.service";
import ProductList from "@/components/ProductList/ProductList";
import MyPagination from "@/components/MyPagination/MyPagination";
import { ProductResponse } from "@/types/response.type";
import ProductListSkeleton from "@/components/ProductItemSkeleton/ProductItemSkeleton";

export default function ProductSearchPage() {
  const { category, brand } = useParams();
  const [searchParams] = useSearchParams();

  const [products, setProducts] = useState<ProductResponse[]>([]);
  const [totalItem, setTotalItem] = useState(0);
  const [loading, setLoading] = useState(true);

  const page = +(searchParams.get("page") || 1);
  const limit = +(searchParams.get("limit") || 10);
  const sort = searchParams.get("sort") || undefined;
  const filters = searchParams.get("filters") || undefined;

  const categoryCP = useMemo(() => category?.replace(".html", ""), [category]);
  const brandCP = useMemo(() => brand?.replace(".html", ""), [brand]);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const { products, totalItem } = await getProduct(
          page,
          limit,
          categoryCP,
          brandCP,
          sort,
          filters
        );
        setProducts(products);
        setTotalItem(totalItem);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [page, limit, sort, filters, categoryCP, brandCP]);

  return (
    <div className="flex flex-col gap-4 px-2 pt-4 pb-10">
      {categoryCP && (
        <>
          <NavBrand category={categoryCP} />
          <ProductFilter brand={brandCP} category={categoryCP} />
        </>
      )}
      <ProductSort />

      {loading ? (
        <ProductListSkeleton count={10} />
      ) : (
        <>
          <ProductList products={products} />
          <MyPagination current={page} pageSize={limit} total={totalItem} />
        </>
      )}
    </div>
  );
}
