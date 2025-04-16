import { Empty } from "antd";
import { Link } from "react-router";
import { ProductResponse } from "@/types/response.type";
import ImageWithFallback from "@/components/ImageWithFallback/ImageWithFallback";
import { converPriceToVN } from "@/lib/utils";

export const SearchOutput = ({
  products,
  handleCancel,
}: {
  products: ProductResponse[];
  handleCancel: () => void;
}) => {
  return (
    <>
      <h2 className="px-[10px] py-[5px] bg-[#f3f3f3]">Có phải bạn muốn tìm</h2>
      <ul className="mb-1">
        {products.map((product) => (
          <li
            key={product.id}
            className="px-[10px] py-[5px] hover:bg-[#f5f5f5] text-sm text-[#7D7D7D] line-clamp-1"
          >
            <Link onClick={handleCancel} to={`/${product.slug}`}>
              {product.name}
            </Link>
          </li>
        ))}
      </ul>

      <h2 className="px-[10px] py-[5px] bg-[#f3f3f3]">Sản phẩm gợi ý</h2>
      <ul className="mb-1">
        {products.map((product) => (
          <li
            key={product.id}
            className="px-[10px] py-[5px] text-[12px] hover:bg-[#f5f5f5]"
          >
            <Link onClick={handleCancel} to={`/${product.slug}`}>
              <div className="flex items-center gap-3">
                <ImageWithFallback
                  width={50}
                  height={50}
                  alt={product.name}
                  src={product.thumbnail}
                  fallbackSrc="/images/error/productError.png"
                />
                <div>
                  <h2 className="font-bold line-clamp-1">{product.name}</h2>
                  <div>
                    <span className="font-bold text-red-500 text-sm mr-1">
                      {converPriceToVN(product.newPrice, "đ")}
                    </span>
                    <span className="line-through font-bold text-gray-500">
                      {converPriceToVN(product.oldPrice, "đ")}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export const EmpytyProduct = () => (
  <div className="flex items-center justify-center py-3">
    <Empty description="Không tìm thấy kết quả" />
  </div>
);
