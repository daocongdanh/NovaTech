import { NavBrandButton } from "@/components/NavBrandButton/NavBrandButton";
import ProductTop from "@/components/ProductTop/ProductTop";
import { getbrandsByCategory } from "@/services/brand.service";
import { BrandResponse, CategoryResponse } from "@/types/response.type";
import { useEffect, useState } from "react";
import { Link } from "react-router";

export default function Section({ category }: { category: CategoryResponse }) {
  const [brands, setBrands] = useState<BrandResponse[]>([]);
  useEffect(() => {
    const fetchApi = async () => {
      const brandsRes = await getbrandsByCategory(category.slug);
      setBrands(brandsRes);
    };
    fetchApi();
  }, []);
  return (
    <div className="flex flex-col gap-3">
      <h2 className="font-bold text-2xl capitalize">{category.name} nổi bật</h2>
      <div className="w-full overflow-auto no-scrollbar">
        <div className="flex gap-3 justify-between items-center">
          <div className="flex gap-3">
            {brands.length > 0 &&
              brands.map((brand: BrandResponse) => (
                <Link
                  key={`brand_${brand.id}`}
                  to={`/danh-muc/${category.slug}/${brand.name}.html`}
                >
                  <NavBrandButton label={brand.name} />
                </Link>
              ))}
          </div>
          <div>
            <Link to={`/danh-muc/${category.slug}.html`}>
              <NavBrandButton label="Xem tất cả" danger />
            </Link>
          </div>
        </div>
      </div>
      <ProductTop category={category} />
    </div>
  );
}
