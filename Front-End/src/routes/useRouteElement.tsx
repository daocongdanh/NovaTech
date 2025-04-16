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
import ProductUpdate from "@/pages/admin/ProductManagement/ProductUpdate";
import BrandAdd from "@/pages/admin/BrandManagement/BrandAdd";
import BrandUpdate from "@/pages/admin/BrandManagement/BrandUpdate";
import AttributeAdd from "@/pages/admin/AttributeManagement/AttributeAdd";
import AttributeUpdate from "@/pages/admin/AttributeManagement/AttributeUpdate";
import CategoryAttributeManagement from "@/pages/admin/CategoryAttributeManagement/CategoryAttributeManagement";
import CategoryAttributeAdd from "@/pages/admin/CategoryAttributeManagement/CategoryAttributeAdd";
import CategoryBrandManagement from "@/pages/admin/CategoryBrandManagement/CategoryBrandManagement";
import CategoryBrandAdd from "@/pages/admin/CategoryBrandManagement/CategoryBrandAdd";
import ArticleAdd from "@/pages/admin/ArticleManagement/ArticleAdd";
import ArticleUpdate from "@/pages/admin/ArticleManagement/ArticleUpdate";
import ArticlePage from "@/pages/user/ArticlePage/ArticlePage";
import ArticleDetailPage from "@/pages/user/ArticleDetailPage/ArticleDetailPage";
import Error404 from "@/pages/error/Error404/Error404";
export default function useRouteElement() {
  const routes = [
    {
      path: "/",
      element: <UserLayout />,
      children: [
        {
          path: "not-found",
          element: <Error404 />,
        },
        { path: "", element: <HomePage /> },
        { path: "/bai-viet", element: <ArticlePage /> },
        { path: "/bai-viet/:slug", element: <ArticleDetailPage /> },
        { path: "/:slug", element: <ProductDetailPage /> },
        { path: "/danh-muc/:category", element: <ProductSearchPage /> },
        { path: "/danh-muc/:category/:brand", element: <ProductSearchPage /> },
        {
          path: "*",
          element: <Error404 />,
        },
      ],
    },
    {
      path: "/admin",
      element: <AdminLayout />,
      children: [
        { path: "", element: <ProductManagement /> },
        { path: "add", element: <ProductAdd /> },
        { path: "update/:id", element: <ProductUpdate /> },
        { path: "categories", element: <CategoryManagement /> },
        { path: "categories/add", element: <CategoryAdd /> },
        { path: "categories/update/:id", element: <CategoryUpdate /> },
        { path: "brands", element: <BrandManagement /> },
        { path: "brands/add", element: <BrandAdd /> },
        { path: "brands/update/:id", element: <BrandUpdate /> },
        { path: "attributes", element: <AttributeManagement /> },
        { path: "attributes/add", element: <AttributeAdd /> },
        { path: "attributes/update/:id", element: <AttributeUpdate /> },
        { path: "articles", element: <ArticleManagement /> },
        { path: "articles/add", element: <ArticleAdd /> },
        { path: "articles/update/:id", element: <ArticleUpdate /> },
        { path: "articles/test", element: <ArticleUpdate /> },
        {
          path: "category-attributes",
          element: <CategoryAttributeManagement />,
        },
        {
          path: "category-attributes/add",
          element: <CategoryAttributeAdd />,
        },
        {
          path: "category-brands",
          element: <CategoryBrandManagement />,
        },
        {
          path: "category-brands/add",
          element: <CategoryBrandAdd />,
        },
      ],
    },
  ];
  return useRoutes(routes);
}
