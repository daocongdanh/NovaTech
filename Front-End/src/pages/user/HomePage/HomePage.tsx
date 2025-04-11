import Banner from "@/components/Banner/Banner";
import CategoryCarousel from "@/components/CategoryCarousel/CategoryCarousel";
import { useEffect, useState } from "react";
import { CategoryResponse } from "@/types/response.type";
import { getAllCategory } from "@/services/category.service";
import Section from "@/components/Section/Section";

export default function HomePage() {
  const [categories, setCategories] = useState<CategoryResponse[]>([]);
  useEffect(() => {
    const fetchApi = async () => {
      const categoriesRes = await getAllCategory();
      setCategories(categoriesRes);
    };
    fetchApi();
  }, []);

  return (
    <div className="">
      <CategoryCarousel />
      <Banner />
      <div className="flex flex-col gap-3 px-2 py-4">
        {categories.map((category: CategoryResponse) => (
          <Section key={`category_${category.id}`} category={category} />
        ))}
      </div>
    </div>
  );
}
