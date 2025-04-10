import { Outlet } from "react-router";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";

export default function UserLayout() {
  return (
    <div className="relative">
      <Header />
      <main className="text-[#444444] max-w-[1200px] mx-auto w-full pt-5">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
