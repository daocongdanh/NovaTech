import {
  BrandResponse,
  CategoryResponse,
  ProductResponse,
} from "@/types/response.type";
import { Link } from "react-router";

const ProductDropdown = ({
  brand,
  category,
  products,
}: {
  brand: BrandResponse;
  category: CategoryResponse;
  products: ProductResponse[];
}) => {
  return (
    <div className="min-w-[300px] min-h-[282px] bg-white shadow-md border rounded-lg p-4">
      <h4 className="font-semibold mb-2">Sản phẩm của {brand.name}</h4>
      <ul className="text-sm space-y-1">
        {products.map((product) => (
          <li key={product.id}>
            <Link to={`${product.slug}`} className="hover:text-[#d70018]">
              {product.name}
            </Link>
          </li>
        ))}
        <li>
          <Link
            to={`/danh-muc/${category.slug}/${brand.name}.html`}
            className="text-[#d70018] font-medium"
          >
            Xem tất cả
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default ProductDropdown;
