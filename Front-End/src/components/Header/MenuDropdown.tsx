import { BrandResponse, CategoryResponse } from "@/types/response.type";
import { Link } from "react-router";
// import { RightOutlined } from "@ant-design/icons";
import ProductDropdown from "@/components/ProductDropdown/ProductDropdown";
import { useEffect, useState } from "react";
import { getProduct } from "@/services/product.service";
import { ProductResponse } from "@/types/response.type";

const capitalizeFirstLetter = (str: string) =>
  str.charAt(0).toUpperCase() + str.slice(1);

const MenuDropdown = ({
  category,
  brands,
  isPreview = false,
}: {
  category: CategoryResponse;
  brands: BrandResponse[];
  isPreview?: boolean;
}) => {
  const [hoveredBrand, setHoveredBrand] = useState<BrandResponse | null>(null);
  const [products, setProducts] = useState<ProductResponse[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      if (hoveredBrand) {
        const data = await getProduct(
          1,
          10,
          category.slug,
          hoveredBrand.name,
          "",
          "",
          true
        );
        setProducts(data.products);
      }
    };
    fetchProducts();
  }, [hoveredBrand]);

  if (!isPreview) {
    return (
      <Link
        to={`/danh-muc/${category.slug}.html`}
        className="h-9 flex items-center justify-between gap-2 cursor-pointer text-sm text-[#343A40] font-semibold hover:bg-gray-100 px-2 transition-all rounded-xl"
      >
        <div className="flex items-center gap-4">
          <img
            src={category.image}
            alt={category.name}
            className="w-5 h-5 object-contain"
          />
          <span className="hover:text-[#d70018]">{category.name}</span>
        </div>
      </Link>
    );
  }

  return (
    <div
      className="relative flex gap-4"
      onMouseLeave={() => setHoveredBrand(null)}
    >
      <div className="w-[250px]">
        <h3 className="font-bold mb-2">Hãng {category.name}</h3>
        <ul className="space-y-1 text-sm">
          {brands.map((brand) => (
            <li
              key={brand.id}
              onMouseEnter={() => setHoveredBrand(brand)}
              className="cursor-pointer hover:text-[#d70018]"
            >
              <Link to={`/danh-muc/${category.slug}/${brand.name}.html`}>
                {capitalizeFirstLetter(brand.name)}
              </Link>
            </li>
          ))}
          <li>
            <Link
              to={`/danh-muc/${category.slug}.html`}
              className="font-medium text-[#d70018]"
            >
              Xem tất cả
            </Link>
          </li>
        </ul>
      </div>

      {/* Hiển thị ProductDropdown bên phải brand list */}
      {hoveredBrand && products.length > 0 && (
        <div className="absolute left-full top-[-26px] z-50">
          <ProductDropdown
            brand={hoveredBrand}
            category={category}
            products={products}
          />
        </div>
      )}
    </div>
  );
};

export default MenuDropdown;
