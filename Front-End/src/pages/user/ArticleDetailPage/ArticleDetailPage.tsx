import { getArticleBySlug } from "@/services/article.service";
import { Article } from "@/types/response.type";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { CalendarOutlined } from "@ant-design/icons";
import { FaRegUserCircle } from "react-icons/fa";

export default function ArticleDetailPage() {
  const { slug } = useParams();
  const [article, setArticle] = useState<Article>();
  useEffect(() => {
    const fetchApi = async () => {
      const articleRes = await getArticleBySlug(slug ?? "");
      setArticle(articleRes);
    };
    fetchApi();
  }, []);

  const relatedPosts = [
    {
      title: "Sự khác nhau giữa ổ cứng SSD và HDD như thế nào?",
      img: "/banner1.jpg",
    },
    {
      title: "Apple sẽ sớm ra mắt các mẫu MacBook Air 13 inch và 15 inch mới",
      img: "/banner1.jpg",
    },
    {
      title: "Thay màn hình Laptop Dell giá bao nhiêu tiền? Có đắt không?",
      img: "/banner1.jpg",
    },
    {
      title:
        "Laptop máy tính bàn đang chạy tự nhiên tắt nguồn liên tục hoặc bật không lên",
      img: "/banner1.jpg",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto p-4">
      <div className="flex flex-col md:flex-row gap-10">
        {/* LEFT - Article */}
        <div className="md:w-2/3">
          <h1 className="text-2xl md:text-3xl font-bold mb-4 leading-tight">
            {article?.title}
          </h1>

          <div className="flex flex-wrap items-center text-sm text-gray-500 mb-6 gap-4">
            <div className="flex items-center gap-2">
              <FaRegUserCircle className="text-2xl" />
              <span className="text-[15px]">Admin</span>
            </div>
            <span className="text-[15px]">
              <CalendarOutlined className="mr-2" />
              {article?.createdAt}
            </span>
          </div>
          <p
            className="text-gray-800 leading-relaxed whitespace-pre-line"
            dangerouslySetInnerHTML={{ __html: article?.content }}
          ></p>
        </div>

        {/* RIGHT - Related posts */}
        <div className="md:w-1/3">
          <h2 className="text-lg md:text-xl font-semibold mb-4 border-b pb-2">
            Bài viết mới nhất
          </h2>

          <ul className="space-y-4">
            {relatedPosts.map((post, index) => (
              <li key={index} className="flex items-start gap-3">
                <div className="w-16 h-12 flex-shrink-0 rounded overflow-hidden">
                  <img
                    src={post.img}
                    alt={post.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="text-sm text-gray-700 hover:text-red-500 transition cursor-pointer">
                  {post.title}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
