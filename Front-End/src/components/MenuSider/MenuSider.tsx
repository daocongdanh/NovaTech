import {
  TagsOutlined,
  AppstoreOutlined,
  LogoutOutlined,
  TrademarkOutlined,
  SettingOutlined,
  FileTextOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import { Link, useLocation } from "react-router";

export default function MenuSider() {
  const location = useLocation();
  const currentPath = location.pathname;

  const items = [
    {
      key: "/admin",
      label: <Link to="/admin">Product</Link>,
      icon: <AppstoreOutlined style={{ fontSize: "17px" }} />,
    },
    {
      key: "/admin/categories",
      label: <Link to="/admin/categories">Category</Link>,
      icon: <TagsOutlined style={{ fontSize: "17px" }} />,
    },
    {
      key: "/admin/brands",
      label: <Link to="/admin/brands">Brand</Link>,
      icon: <TrademarkOutlined style={{ fontSize: "17px" }} />,
    },
    {
      key: "/admin/attributes",
      label: <Link to="/admin/attributes">Attribute</Link>,
      icon: <SettingOutlined style={{ fontSize: "17px" }} />,
    },
    {
      key: "/admin/articles",
      label: <Link to="/admin/articles">Article</Link>,
      icon: <FileTextOutlined style={{ fontSize: "17px" }} />,
    },
    {
      key: "Logout",
      label: <Link to="/logout">Logout</Link>,
      icon: <LogoutOutlined style={{ fontSize: "17px" }} />,
    },
  ];

  const matchedKey =
    items
      .filter((item) => currentPath.startsWith(item.key))
      .sort((a, b) => b.key.length - a.key.length)[0]?.key || "";
  return (
    <Menu
      mode="inline"
      items={items}
      selectedKeys={[matchedKey]}
      style={{ fontSize: "17px" }}
    />
  );
}
