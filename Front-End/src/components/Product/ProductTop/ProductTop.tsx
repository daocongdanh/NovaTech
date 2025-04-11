import { useEffect, useState } from "react";
import { CategoryResponse, ProductResponse } from "@/types/response.type";
import { getTop10ProductsByCategory } from "@/services/product.service";
import ProductListSkeleton from "@/components/Product/ProductItemSkeleton/ProductItemSkeleton";
import ProductItem from "@/components/Product/ProductItem/ProductItem";

export default function ProductTop({
  category,
}: {
  category: CategoryResponse;
}) {
  const [products, setProducts] = useState<ProductResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const data = await getTop10ProductsByCategory({
          categoryId: category.id,
        });
        setProducts(data);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [category.id]);

  if (loading) return <ProductListSkeleton count={10} />;
  return (
    <div className="py-4 px-2 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {products.map((product) => (
        <ProductItem key={`product_${product.id}`} product={product} />
      ))}
    </div>
  );
}
