export default function Footer() {
  const socials = [
    {
      name: "Facebook",
      image: "/facebook.png",
      link: "",
    },
    {
      name: "Tiktok",
      image: "/tiktok.png",
      link: "",
    },
    {
      name: "Zalo",
      image: "/zalo.png",
      link: "",
    },
  ];
  return (
    <footer className="bg-white mt-20 border-t border-gray-100 text-sm text-[#343a40] shadow-[0_0_10px_rgba(0,0,0,0.05)]">
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {/* Cột 1 */}
        <div>
          <h3 className="font-semibold mb-3">VỀ TECHSTORE</h3>
          <ul className="space-y-1">
            <li>Giới thiệu</li>
            <li>Tuyển dụng</li>
            <li>Liên hệ</li>
          </ul>
        </div>

        {/* Cột 2 */}
        <div>
          <h3 className="font-semibold mb-3">CHÍNH SÁCH</h3>
          <ul className="space-y-1">
            <li>Chính sách bảo hành</li>
            <li>Chính sách giao hàng</li>
            <li>Chính sách bảo mật</li>
          </ul>
        </div>

        {/* Cột 3 */}
        <div>
          <h3 className="font-semibold mb-3">THÔNG TIN</h3>
          <ul className="space-y-1">
            <li>Hệ thống cửa hàng</li>
            <li>Hướng dẫn mua hàng</li>
            <li>Hướng dẫn thanh toán</li>
            <li>Hướng dẫn trả góp</li>
            <li>Tra cứu địa chỉ bảo hành</li>
          </ul>
        </div>

        {/* Cột 4 */}
        <div>
          <h3 className="font-semibold mb-3">
            TỔNG ĐÀI HỖ TRỢ{" "}
            <span className="text-sm font-normal">(8:00 - 21:00)</span>
          </h3>
          <ul className="space-y-1">
            <li>
              Mua hàng:{" "}
              <span className="text-[#1982F9] font-semibold">039.240.6660</span>
            </li>
            <li>
              Bảo hành:{" "}
              <span className="text-[#1982F9] font-semibold">039.240.6660</span>
            </li>
            <li>
              Khiếu nại:{" "}
              <span className="text-[#1982F9] font-semibold">039.240.6660</span>
            </li>
            <li>
              Email:{" "}
              <span className="text-[#1982F9] font-semibold">
                danhlaptrinh@gmail.com
              </span>
            </li>
          </ul>
        </div>

        {/* Cột 5: Mạng xã hội (chỉ hiện trên xl) */}
        <div className="hidden xl:block">
          <h3 className="font-semibold mb-3">MẠNG XÃ HỘI</h3>
          <div className="flex gap-3">
            {socials.map((item) => (
              <a
                key={`xl-${item.name}`}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={item.image}
                  alt="Facebook"
                  className="w-8 h-8 object-cover"
                  loading="lazy"
                  width={32}
                  height={32}
                />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Mạng xã hội trên mobile */}
      <div className="xl:hidden border-t border-gray-200 py-4 px-4 max-w-7xl mx-auto">
        <div className="font-semibold mb-3">KẾT NỐI VỚI CHÚNG TÔI</div>
        <div className="flex gap-3">
          {socials.map((item) => (
            <a
              key={`mobile-${item.name}`}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={item.image}
                alt="Facebook"
                className="w-8 h-8 object-cover"
                loading="lazy"
                width={32}
                height={32}
              />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
