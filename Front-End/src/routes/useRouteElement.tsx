import { useRoutes } from "react-router";
import UserLayout from "../layouts/UserLayout";
import HomePage from "../pages/HomePage/HomePage";
import ProductDetailPage from "@/pages/ProductDetailPage/ProductDetailPage";
import ProductSearchPage from "@/pages/ProductSearchPage/ProductSearchPage";

export default function useRouteElement() {
  const routes = [
    {
      path: "/",
      element: <UserLayout />,
      children: [
        { path: "", element: <HomePage /> },
        { path: "/:slug", element: <ProductDetailPage /> },
        { path: "/danh-muc/:category", element: <ProductSearchPage /> },
        { path: "/danh-muc/:category/:brand", element: <ProductSearchPage /> },
      ],
    },
  ];
  return useRoutes(routes);
}
