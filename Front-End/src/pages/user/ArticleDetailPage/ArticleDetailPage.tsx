import {
  getArticleBySlug,
  getLatestArticles,
} from "@/services/article.service";
import { Article } from "@/types/response.type";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { CalendarOutlined } from "@ant-design/icons";
import { FaRegUserCircle } from "react-icons/fa";

export default function ArticleDetailPage() {
  const { slug } = useParams();
  const [article, setArticle] = useState<Article>();
  const [latestArticles, setLatestArticles] = useState<Article[]>([]);
  useEffect(() => {
    const fetchApi = async () => {
      const articleRes = await getArticleBySlug(slug ?? "");
      setArticle(articleRes);
      const articlesRes = await getLatestArticles();
      setLatestArticles(articlesRes);
    };
    fetchApi();
  }, [slug]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="flex flex-col lg:flex-row gap-10">
        {/* LEFT - Article */}
        <div className="lg:w-2/3 w-full">
          <h1 className="text-2xl lg:text-3xl font-bold mb-4 leading-tight">
            {article?.title}
          </h1>

          <div className="flex flex-wrap items-center text-sm text-gray-500 mb-6 gap-4">
            <div className="flex items-center gap-2">
              <FaRegUserCircle className="text-2xl" />
              <span className="text-[15px]">Admin</span>
            </div>
            <span className="text-[15px] flex items-center">
              <CalendarOutlined className="mr-2" />
              {article?.createdAt
                ? new Date(article.createdAt).toLocaleDateString()
                : ""}
            </span>
          </div>

          <p
            className="quill-content"
            dangerouslySetInnerHTML={{
              __html: article?.content as TrustedHTML,
            }}
          ></p>
        </div>

        {/* RIGHT - Related posts */}
        <div className="lg:w-1/3 w-full">
          <h2 className="text-xl lg:text-2xl font-semibold mb-4 border-b pb-2">
            Bài viết mới nhất
          </h2>

          <ul className="space-y-6">
            {latestArticles.map((item) => (
              <li key={`latest-${item.id}`}>
                <Link
                  to={`/bai-viet/${item.slug}`}
                  className="flex flex-col sm:flex-row items-start gap-3 hover:bg-gray-50 p-3 rounded-md transition"
                >
                  <div className="w-full sm:w-28 h-40 sm:h-20 rounded-md overflow-hidden flex-shrink-0">
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1 mt-2 sm:mt-0">
                    <p className="text-base sm:text-sm text-gray-800 font-semibold hover:text-red-500 transition cursor-pointer line-clamp-2">
                      {item.title}
                    </p>
                    <span className="text-xs text-gray-500 flex items-center mt-1">
                      <CalendarOutlined className="mr-1" />
                      {new Date(item.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
