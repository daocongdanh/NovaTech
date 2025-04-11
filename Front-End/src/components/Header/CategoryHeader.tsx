import { MenuDropdown } from "@/components/Header/MenuDropdown";
import { getbrandsByCategory } from "@/services/brand.service";
import { getAllCategory } from "@/services/category.service";
import { BrandResponse, CategoryResponse } from "@/types/response.type";
import { Popover } from "antd";
import { useEffect, useState } from "react";
import { FaBars } from "react-icons/fa";

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
    <MenuDropdown name={category.name} category={category} brands={brands} />
  );
};

export default function CategoryHeader() {
  const [categories, setCategories] = useState<CategoryResponse[]>([]);
  useEffect(() => {
    const fetchApi = async () => {
      const categoriesRes = await getAllCategory(true);
      setCategories(categoriesRes);
    };
    fetchApi();
  }, []);
  return (
    <div className=" bg-[#d70018]">
      <div className="max-w-[1200px] mx-auto px-[10px] hidden md:block">
        <div className="flex justify-between border-t border-white py-1">
          {categories.map((category: CategoryResponse) => (
            <CategoryDropDown
              key={`category_${category.id}`}
              category={category}
            />
          ))}
        </div>
      </div>

      {/* Mobile */}
      <div className="md:hidden px-[10px] py-2 max-w-[1200px] mx-auto">
        <Popover
          placement="bottomLeft"
          trigger="click"
          content={
            <div className="flex flex-col gap-2 min-w-[200px]">
              {categories.map((category: CategoryResponse) => (
                <CategoryDropDown
                  key={`category_mobile_${category.id}`}
                  category={category}
                />
              ))}
            </div>
          }
        >
          <div className="text-white flex items-center gap-2 cursor-pointer">
            <FaBars />
            <span className="uppercase text-sm font-semibold">Danh mục</span>
          </div>
        </Popover>
      </div>
    </div>
  );
}
