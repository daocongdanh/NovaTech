import { useEffect, useState } from "react";
import { Article, CategoryResponse } from "@/types/response.type";
import { getAllCategory } from "@/services/category.service";
import Section from "@/components/Section/Section";
import ActicleTop from "@/components/Article/ArticleTop";
import { NavBrandButton } from "@/components/NavBrandButton/NavBrandButton";
import { Link } from "react-router";
import HomeSection from "@/components/HomeSection/HomeSection";

const data: Article[] = [
  {
    id: 1,
    title: "Hướng dẫn sử dụng thao tác kéo thả đa nhiệm trên OPPO Find N5",
    slug: "123",
    thumbnail: "/banner1.jpg",
    content: "",
    createdAt: new Date(),
    active: true,
  },
  {
    id: 2,
    title: "Hướng dẫn sử dụng thao tác kéo thả đa nhiệm trên OPPO Find N5",
    slug: "123",
    thumbnail: "/banner1.jpg",
    content: "",
    createdAt: new Date(),
    active: true,
  },
  {
    id: 3,
    title: "Hướng dẫn sử dụng thao tác kéo thả đa nhiệm trên OPPO Find N5",
    slug: "123",
    thumbnail: "/banner1.jpg",
    content: "",
    createdAt: new Date(),
    active: true,
  },
  {
    id: 4,
    title: "Hướng dẫn sử dụng thao tác kéo thả đa nhiệm trên OPPO Find N5",
    slug: "123",
    thumbnail:
      "https://maytinhgiare.vn/hinh-anh/tin-tuc/thay-man-hinh-laptop-dell-bao-nhieu-tien.jpg",
    content: "",
    createdAt: new Date(),
    active: true,
  },
];
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
      <HomeSection />

      <div className="flex flex-col gap-3 px-2 py-4">
        {categories.map((category: CategoryResponse) => (
          <Section key={`category_${category.id}`} category={category} />
        ))}
      </div>
      <div className="px-4 sm:px-4 md:px-6 xl:px-0">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-bold text-2xl capitalize">Bài viết nổi bật</h2>
          <Link to={`/bai-viet`}>
            <NavBrandButton label="Xem tất cả" danger />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
          {data.map((item) => (
            <ActicleTop key={item.id} article={item} />
          ))}
        </div>
      </div>
    </div>
  );
}
