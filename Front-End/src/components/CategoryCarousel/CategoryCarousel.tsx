import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

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
    highlight: true,
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
export default function CategoryCarousel() {
  return (
    <div className="relative rounded-xl shadow">
      <Carousel>
        <CarouselContent>
          {carouselItems.map((item, index) => (
            <CarouselItem key={index} className="relative rounded-xl">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-96 object-cover rounded-xl"
              />
              {/* <div className="absolute bottom-0 left-0 right-0 bg-white bg-opacity-80 p-2 text-center">
                <div>{item.title}</div>
                <div className="text-xs">{item.description}</div>
              </div> */}
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}
