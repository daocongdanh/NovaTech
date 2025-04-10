import { useEffect, useState } from "react";
import { Link } from "react-router";
import { getbrandsByCategory } from "@/services/brand.service";
import { NavBrandButton } from "@/components/NavBrandButton/NavBrandButton";
import { BrandResponse } from "@/types/response.type";

export default function NavBrand({ category }: { category: string }) {
  const [brands, setBrands] = useState<BrandResponse[]>([]);

  useEffect(() => {
    const fetchApi = async () => {
      const res = await getbrandsByCategory(category);
      setBrands(res);
    };

    fetchApi();
  }, [category]);

  return (
    <div className="w-full overflow-auto no-scrollbar">
      <div className="flex gap-3 justify-between items-center">
        <div className="flex gap-3">
          {brands.map((brand) => (
            <Link
              key={`brand_${brand.id}`}
              to={`/danh-muc/${category}/${brand.name}.html`}
            >
              <NavBrandButton label={brand.name} />
            </Link>
          ))}
        </div>
        <div>
          <Link to={`/danh-muc/${category}.html`}>
            <NavBrandButton label="Xem tất cả" danger />
          </Link>
        </div>
      </div>
    </div>
  );
}
