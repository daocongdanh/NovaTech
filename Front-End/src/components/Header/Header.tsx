import { FaShopify } from "react-icons/fa";
import { Link } from "react-router";
// import Breadcrumb from "@/components/BreadCumb/Breadcrumb";
import { PiPhoneThin } from "react-icons/pi";
import SearchInput from "@/components/Search/SearchInput";
export default function Header() {
  return (
    <div className="sticky top-0 w-full z-30">
      <div className="bg-[#d70018] text-white py-1">
        <div className="max-w-[1200px] mx-auto px-[10px] h-14 flex gap-4 items-center justify-between">
          <Link to={"/"}>
            <h2 className="hidden md:flex items-center text-white font-bold text-2xl">
              <img
                src="/logo123.png"
                alt=""
                className="w-8 h-8 object-cover rounded-full mr-2"
              />
              TechStore
            </h2>
            <h2 className="md:hidden block">
              <FaShopify size={34} />
            </h2>
          </Link>
          <SearchInput />
          <Link className="hidden md:block" to={"/"}>
            <div className="flex gap-1">
              <PiPhoneThin size={34} />
              <p className="text-sm">
                Gọi mua hàng <br />
                039.240.6660
              </p>
            </div>
          </Link>
        </div>
      </div>
      {/* <Breadcrumb /> */}
    </div>
  );
}
