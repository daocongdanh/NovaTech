import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

const carouselItems = [
  {
    title: "Laptop Dell",
    description: "Ưu đãi giảm giá",
    image: "https://maytinhgiare.vn/hinh-anh/quang-cao/Laptop-dell.jpg",
  },
  {
    title: "Laptop Asus",
    description: "Dẫn đầu xu hướng",
    image: "https://maytinhgiare.vn/hinh-anh/quang-cao/Baner-laptop-asus.jpg",
  },
  {
    title: "MSI Modern",
    description: "Thiết kế mỏng nhẹ",
    image:
      "https://maytinhgiare.vn/hinh-anh/quang-cao/Laptop%20MSI%20Modern.jpg",
  },
  {
    title: "Laptop Workstation",
    description: "Đồ hoạ - Kỹ thuật",
    image:
      "https://maytinhgiare.vn/hinh-anh/quang-cao/Baner-laptop-workstation.jpg",
  },
];
export default function MainBanner() {
  return (
    <div className="relative rounded-xl shadow xl:mx-0">
      <Carousel
        opts={{
          loop: true,
        }}
        plugins={[
          Autoplay({
            delay: 3000,
            stopOnInteraction: false,
          }),
        ]}
      >
        <CarouselContent className="h-full">
          {carouselItems.map((item, index) => (
            <CarouselItem key={index} className="relative rounded-xl h-full">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover rounded-xl"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
