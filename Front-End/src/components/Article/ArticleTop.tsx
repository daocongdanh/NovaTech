import { Article } from "@/types/response.type";
import { Link } from "react-router";

export default function ActicleTop({ article }: { article: Article }) {
  return (
    <Link to={article.slug}>
      <div className="bg-white rounded-xl shadow-sm overflow-hidden transform transition duration-400 hover:scale-105 p-2 border-1 border-gray-200">
        <div className="w-full h-40 relative">
          <img
            src={article.thumbnail}
            alt={article.title}
            className="object-cover rounded-t-xl w-full"
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
