import { useState } from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Button, Layout, theme } from "antd";
import { Link, Outlet } from "react-router";
import MenuSider from "@/components/MenuSider/MenuSider";
const { Header, Sider, Content } = Layout;
export default function AdminLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Layout className="h-[100vh]">
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        theme="light"
        width={230}
      >
        <div className="p-[10px] border-r-[1px] border-[#rgba(5, 5, 5, 0.06)]">
          {collapsed ? (
            <Link to={"/admin"} className="flex justify-center">
              <img
                src={"/logoAdmin.png"}
                alt=""
                className="w-[40px] object-contain"
              />
            </Link>
          ) : (
            <Link to={"/admin"} className="flex justify-center my-[5px]">
              <p className="uppercase font-bold text-gray-700 text-2xl">
                Techstore
              </p>
            </Link>
          )}
        </div>
        <MenuSider />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
            overflowY: "auto",
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
}
