import MenuDropdown from "@/components/Header/MenuDropdown";
import { getbrandsByCategory } from "@/services/brand.service";
import { getAllCategory } from "@/services/category.service";
import { BrandResponse, CategoryResponse } from "@/types/response.type";
import { useEffect, useState } from "react";

export const CategoryDropDown = ({
  category,
}: {
  category: CategoryResponse;
}) => {
  return (
    <div className="cursor-pointer">
      <MenuDropdown brands={[]} category={category} isPreview={false} />
    </div>
  );
};

export default function CategorySidebar() {
  const [categories, setCategories] = useState<CategoryResponse[]>([]);
  const [hoveredCategory, setHoveredCategory] =
    useState<CategoryResponse | null>(null);
  const [brands, setBrands] = useState<BrandResponse[]>([]);

  useEffect(() => {
    const fetchApi = async () => {
      const categoriesRes = await getAllCategory(true);
      setCategories(categoriesRes);
    };
    fetchApi();
  }, []);

  useEffect(() => {
    const fetchBrands = async () => {
      if (hoveredCategory) {
        const data = await getbrandsByCategory(hoveredCategory.slug);
        setBrands(data);
      }
    };
    fetchBrands();
  }, [hoveredCategory]);

  return (
    <div className="bg-white shadow-md rounded-xl border border-gray-100 h-full">
      <div className="rounded-md hidden md:block h-full">
        <div
          className="flex flex-col px-2 py-3 gap-1 h-full relative group"
          onMouseLeave={() => setHoveredCategory(null)}
        >
          {hoveredCategory && (
            <div
              className="absolute left-full top-[-1px] min-w-[280px] min-h-[282px] bg-white shadow-md 
              p-6 rounded-lg z-50 border border-gray-100"
            >
              <MenuDropdown
                brands={brands}
                category={hoveredCategory}
                isPreview={true}
              />
            </div>
          )}

          {categories.map((category) => (
            <div
              key={`category_${category.id}`}
              onMouseEnter={() => setHoveredCategory(category)}
            >
              <CategoryDropDown category={category} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
