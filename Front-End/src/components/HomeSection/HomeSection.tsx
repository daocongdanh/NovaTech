import CategorySidebar from "@/components/CategorySidebar/CategorySidebar";
import MainBanner from "@/components/MainBanner/MainBanner";
import SideBannerList from "@/components/SideBannerList/SideBannerList";

export default function HomeSection() {
  return (
    <div className="px-2 md:px-4">
      {/* Grid hàng trên */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* CategorySidebar - Ẩn dưới lg */}
        <div className="hidden lg:block lg:col-span-2">
          <CategorySidebar />
        </div>

        {/* MainBanner - luôn hiển thị, full width dưới lg */}
        <div className="col-span-1 lg:col-span-8">
          <MainBanner />
        </div>

        {/* SideBannerList - ẩn dưới lg, hiển thị bên phải trên lg */}
        <div className="hidden lg:grid lg:grid-cols-1 lg:gap-2 lg:col-span-2">
          <SideBannerList />
        </div>
      </div>

      {/* SideBannerList - chỉ hiện ở mobile/tablet dưới MainBanner */}
      <div className="block lg:hidden mt-4">
        <div className="grid grid-cols-3 gap-2">
          <SideBannerList />
        </div>
      </div>
    </div>
  );
}
