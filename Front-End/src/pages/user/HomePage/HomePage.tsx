import { useEffect, useState } from "react";
import { CategoryResponse } from "@/types/response.type";
import { getAllCategory } from "@/services/category.service";
import Section from "@/components/Section/Section";
// import ActicleTop from "@/components/Article/ArticleTop";
// import { NavBrandButton } from "@/components/NavBrandButton/NavBrandButton";
// import { Link } from "react-router";
import HomeSection from "@/components/HomeSection/HomeSection";
// import { getLatestArticles } from "@/services/article.service";
// import {
//   Carousel,
//   CarouselContent,
//   CarouselItem,
// } from "@/components/ui/carousel";
// import Autoplay from "embla-carousel-autoplay";
export default function HomePage() {
  const [categories, setCategories] = useState<CategoryResponse[]>([]);
  // const [articles, setArticles] = useState<Article[]>([]);
  useEffect(() => {
    const fetchApi = async () => {
      const categoriesRes = await getAllCategory();
      setCategories(categoriesRes);
      // const articlesRes = await getLatestArticles();
      // setArticles(articlesRes);
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
      {/* <div className="px-4 sm:px-4 md:px-6 xl:px-0">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-bold text-2xl capitalize">Bài viết nổi bật</h2>
          <Link to={`/bai-viet`}>
            <NavBrandButton label="Xem tất cả" danger />
          </Link>
        </div>
        <div className="block sm:hidden">
          <Carousel
            opts={{
              loop: true,
            }}
            plugins={[
              Autoplay({
                delay: 3000,
                stopOnInteraction: false,
              }),
            ]}
          >
            <CarouselContent>
              {articles.map((item) => (
                <CarouselItem
                  key={item.id}
                  className="pl-2 basis-1/2  md:basis-1/3 lg:basis-1/4 xl:basis-1/5"
                >
                  <ActicleTop article={item} />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
        <div className="hidden sm:grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {articles.map((item) => (
            <ActicleTop key={item.id} article={item} />
          ))}
        </div>
      </div> */}
    </div>
  );
}
