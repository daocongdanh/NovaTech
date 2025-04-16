import { BrandResponse, CategoryResponse } from "@/types/response.type";
import { Link } from "react-router";
import { RightOutlined } from "@ant-design/icons";

const capitalizeFirstLetter = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const MenuDropdown = ({
  category,
  brands,
  name,
  isPreview = false,
}: {
  category: CategoryResponse;
  name: string;
  brands: BrandResponse[];
  isPreview?: boolean;
}) => {
  if (isPreview) {
    return (
      <div className="grid grid-cols-4 gap-6">
        <div>
          <h3 className="font-bold mb-2">Hãng {category.name}</h3>
          <ul className="space-y-1 text-sm">
            {brands.map((item) => (
              <li key={item.id}>
                <Link to={`/danh-muc/${category.slug}/${item.name}.html`}>
                  {capitalizeFirstLetter(item.name)}
                </Link>
              </li>
            ))}
            <li>
              <Link
                to={`/danh-muc/${category.slug}.html`}
                className="font-medium text-[#d70018]"
              >
                Xem tất cả
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold mb-2">Mức giá điện thoại</h3>
          <ul className="space-y-1 text-sm">
            <li>Dưới 2 triệu</li>
            <li>Từ 2 - 4 triệu</li>
            <li>Từ 4 - 7 triệu</li>
            <li>Từ 7 - 13 triệu</li>
            <li>Từ 13 - 20 triệu</li>
            <li>Trên 20 triệu</li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold mb-2">Điện thoại HOT 🔥</h3>
          <ul className="space-y-1 text-sm">
            <li>iPhone 15 Series</li>
            <li>Galaxy S25 Ultra</li>
            <li>Xiaomi 15</li>
            <li>Samsung A26</li>
            <li>OPPO Find N5</li>
            <li>Nothing Phone 2A</li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold mb-2">Hãng máy tính bảng</h3>
          <ul className="space-y-1 text-sm">
            <li>iPad</li>
            <li>Samsung</li>
            <li>Xiaomi</li>
            <li>Huawei</li>
            <li>Lenovo</li>
            <li>Nokia</li>
          </ul>
        </div>
      </div>
    );
  }
  return (
    <div className="">
      <Link
        to={`/danh-muc/${category.slug}.html`}
        className="h-9 flex items-center justify-between gap-2 cursor-pointer text-sm lg:text-sm text-[#343A40] font-semibold hover:bg-gray-100 px-2 transition-all rounded-xl"
      >
        <div className="flex items-center gap-4">
          <img
            src={category.image}
            alt={category.image}
            className="w-5 h-5 object-contain"
          />
          <span className="hover:text-[#d70018]">{name}</span>
        </div>
        <RightOutlined />
      </Link>
    </div>
  );
};
