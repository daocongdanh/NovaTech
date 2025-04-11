import { useRoutes } from "react-router";
import UserLayout from "../layouts/UserLayout";
import ProductDetailPage from "@/pages/user/ProductDetailPage/ProductDetailPage";
import HomePage from "@/pages/user/HomePage/HomePage";
import ProductSearchPage from "@/pages/user/ProductSearchPage/ProductSearchPage";
import AdminLayout from "@/layouts/AdminLayout";
import ProductManagement from "@/pages/admin/ProductManagement/ProductManagement";
import CategoryManagement from "@/pages/admin/CategoryManagement/CategoryManagement";
import BrandManagement from "@/pages/admin/BrandManagement/BrandManagement";
import AttributeManagement from "@/pages/admin/AttributeManagement/AttributeManagement";
import ArticleManagement from "@/pages/admin/ArticleManagement/ArticleManagement";
import CategoryAdd from "@/pages/admin/CategoryManagement/CategoryAdd";
import CategoryUpdate from "@/pages/admin/CategoryManagement/CategoryUpdate";
import ProductAdd from "@/pages/admin/ProductManagement/ProductAdd";

export default function useRouteElement() {
  const routes = [
    {
      path: "/",
      element: <UserLayout />,
      children: [
        { path: "", element: <HomePage /> },
        { path: "/:id", element: <ProductDetailPage /> },
        { path: "/danh-muc/:category", element: <ProductSearchPage /> },
        { path: "/danh-muc/:category/:brand", element: <ProductSearchPage /> },
      ],
    },
    {
      path: "/admin",
      element: <AdminLayout />,
      children: [
        { path: "", element: <ProductManagement /> },
        { path: "add", element: <ProductAdd /> },
        { path: "categories", element: <CategoryManagement /> },
        { path: "categories/add", element: <CategoryAdd /> },
        { path: "categories/update/:id", element: <CategoryUpdate /> },
        { path: "brands", element: <BrandManagement /> },
        { path: "attributes", element: <AttributeManagement /> },
        { path: "articles", element: <ArticleManagement /> },
      ],
    },
  ];
  return useRoutes(routes);
}
