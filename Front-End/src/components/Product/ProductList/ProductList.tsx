import ProductItem from "@/components/Product/ProductItem/ProductItem";
import { ProductResponse } from "@/types/response.type";

export default function ProductList({
  products,
}: {
  products: ProductResponse[];
}) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2">
      {products.map((product) => (
        <ProductItem key={`product_${product.id}`} product={product} />
      ))}
    </div>
  );
}
