import { FaShopify } from "react-icons/fa";
import { Link } from "react-router";
import SearchInput from "../SearchInput/SearchInput";
import Breadcrumb from "@/components/BreadCumb/Breadcrumb";
import { PiPhoneThin } from "react-icons/pi";
import CategoryHeader from "@/components/Header/CategoryHeader";
export default function Header() {
  return (
    <div className="sticky top-0 w-full z-30">
      <div className="bg-[#d70018] text-white py-1">
        <div className="max-w-[1200px] mx-auto px-[10px] h-14 flex gap-4 items-center justify-between">
          <div className="flex gap-3">
            <Link to={"/"}>
              <h2 className="hidden md:flex items-center text-white font-bold text-2xl">
                <FaShopify size={34} />
                Shopify
              </h2>
              <h2 className="md:hidden block">
                <FaShopify size={34} />
              </h2>
            </Link>
            <SearchInput />
          </div>
          <Link className="hidden lg:block" to={"/"}>
            <div className="flex gap-1">
              <PiPhoneThin size={34} />
              <p className="text-sm">
                Gọi mua hàng <br />
                1800.2044
              </p>
            </div>
          </Link>
        </div>
      </div>
      <CategoryHeader />
      <Breadcrumb />
    </div>
  );
}
