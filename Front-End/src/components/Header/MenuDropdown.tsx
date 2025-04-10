import { BrandResponse } from "@/types/response.type";
import { Dropdown, MenuProps } from "antd";
import { Link } from "react-router";

const capitalizeFirstLetter = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};
export const MenuDropdown = ({
  category,
  brands,
  name,
}: {
  category: string;
  name: string;
  brands: BrandResponse[];
}) => {
  let items: MenuProps["items"] = brands.map((item: BrandResponse) => ({
    key: item.id,
    label: (
      <Link to={`/danh-muc/${category}/${item.name}.html`}>
        {capitalizeFirstLetter(item.name)}
      </Link>
    ),
  }));
  items = [
    ...items,
    {
      key: 0,
      label: <Link to={`/danh-muc/${category}.html`}>Xem tất cả</Link>,
    },
  ];
  return (
    <Dropdown menu={{ items }} placement="bottom">
      <Link
        to={`/danh-muc/${category}.html`}
        className="h-9 flex gap-2 items-center cursor-pointer uppercase text-[12px] lg:text-sm text-white hover:text-white"
      >
        {name}
      </Link>
    </Dropdown>
  );
};
