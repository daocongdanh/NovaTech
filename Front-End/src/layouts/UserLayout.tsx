import { Outlet } from "react-router";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import FloatingButton from "@/components/FloatingButton/FloatingButtons";

export default function UserLayout() {
  return (
    <div className="relative">
      <Header />
      <main className="text-[#444444] max-w-[1200px] mx-auto w-full pt-2">
        <Outlet />
      </main>
      <Footer />
      <FloatingButton />
    </div>
  );
}
