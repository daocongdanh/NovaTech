import { MenuDropdown } from "@/components/Header/MenuDropdown";
import { getbrandsByCategory } from "@/services/brand.service";
import { getAllCategory } from "@/services/category.service";
import { BrandResponse, CategoryResponse } from "@/types/response.type";
import { useEffect, useState } from "react";

export const CategoryDropDown = ({
  category,
}: {
  category: CategoryResponse;
}) => {
  const [brands, setBrands] = useState<BrandResponse[]>([]);

  useEffect(() => {
    const fetchApi = async () => {
      const data = await getbrandsByCategory(category.slug);
      setBrands(data);
    };
    fetchApi();
  }, [category.name]);

  return (
    <MenuDropdown
      name={category.name}
      category={category.slug}
      brands={brands}
    />
  );
};

export default function CategoryHeader() {
  const [categories, setCategories] = useState<CategoryResponse[]>([]);
  useEffect(() => {
    const fetchApi = async () => {
      const categoriesRes = await getAllCategory();
      setCategories(categoriesRes);
    };
    fetchApi();
  }, []);
  return (
    <div className=" bg-[#d70018]">
      <div className="max-w-[1200px] mx-auto px-[10px] hidden md:block">
        <div className="flex justify-between border-t border-white">
          {categories.map((category: CategoryResponse) => (
            <CategoryDropDown
              key={`category_${category.id}`}
              category={category}
            />
          ))}
        </div>
      </div>
      {/* <div className="relative text-white max-w-[1200px] mx-auto px-[10px] h-9 md:hidden justify-between">
        <NavCategoryMobile categories={categories} />
      </div> */}
    </div>
  );
}
