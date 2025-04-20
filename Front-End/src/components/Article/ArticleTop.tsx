import { Article } from "@/types/response.type";
import { Link } from "react-router";

export default function ActicleTop({ article }: { article: Article }) {
  return (
    <Link to={`bai-viet/${article.slug}`}>
      <div className="bg-white rounded-xl shadow-sm overflow-hidden transform transition duration-300 hover:scale-102 border border-gray-200">
        <div className="relative w-full aspect-w-16 aspect-h-9">
          <img
            src={article.thumbnail}
            alt={article.title}
            className="object-cover w-full h-full rounded-t-xl"
          />
        </div>

        <div className="p-3">
          <h3 className="text-sm font-semibold text-gray-800 hover:underline cursor-pointer line-clamp-2">
            {article.title}
          </h3>
        </div>
      </div>
    </Link>
  );
}
