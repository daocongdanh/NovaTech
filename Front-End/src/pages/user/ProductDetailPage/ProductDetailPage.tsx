import { useState, useEffect } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import {
  FaCartPlus,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaRegClock,
} from "react-icons/fa";
import { useParams } from "react-router";
import { ProductResponse } from "@/types/response.type";
import {
  getProductBySlug,
  getRandom10Products,
} from "@/services/product.service";
import { converPriceToVN } from "@/lib/utils";
import ProductItem from "@/components/Product/ProductItem/ProductItem";

export default function ProductDetailPage() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [api, setApi] = useState<CarouselApi>();
  const [product, setProduct] = useState<ProductResponse>();
  const [randomProduct, setRandomProduct] = useState<ProductResponse[]>([]);
  const { slug } = useParams();
  useEffect(() => {
    const fetchApi = async () => {
      var res = await getProductBySlug(slug ?? "");
      const productRandomRes = await getRandom10Products(slug ?? "");
      setRandomProduct(productRandomRes);
      res.images.unshift({
        id: 0,
        imageUrl: res.thumbnail,
      });
      setProduct(res);
    };
    fetchApi();
  }, [slug]);

  useEffect(() => {
    if (!api) return;

    api.on("select", () => {
      setSelectedIndex(api.selectedScrollSnap());
    });
  }, [api]);

  const handleThumbClick = (index: number) => {
    setSelectedIndex(index);
    api?.scrollTo(index);
  };

  return (
    <>
      <div className="max-w-7xl mx-auto p-4 grid grid-cols-1 lg:grid-cols-12 gap-6">
        {product && (
          <>
            <div className="lg:col-span-4">
              <Carousel
                setApi={setApi}
                opts={{
                  loop: true,
                }}
                plugins={[
                  Autoplay({
                    delay: 3000,
                    stopOnInteraction: false,
                  }),
                ]}
                className="w-full group"
              >
                <CarouselContent>
                  {product.images.map((img, index) => (
                    <CarouselItem key={index} className="flex justify-center">
                      <img
                        src={img.imageUrl}
                        alt={`Hình ${index + 1}`}
                        className="rounded-md object-contain max-h-[300px] w-full"
                      />
                    </CarouselItem>
                  ))}
                </CarouselContent>

                <CarouselNext className="right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                <CarouselPrevious className="left-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
              </Carousel>

              <div className="flex gap-2 mt-4 flex-wrap justify-center sm:justify-center">
                {product.images.map((img, index) => (
                  <div
                    key={index}
                    onClick={() => handleThumbClick(index)}
                    className={`border-1 rounded-md p-1 w-16 h-16 flex items-center justify-center cursor-pointer transition-all ${
                      selectedIndex === index
                        ? "border-[#d70018] scale-105"
                        : "border-transparent hover:border-gray-300"
                    }`}
                  >
                    <img
                      src={img.imageUrl}
                      alt="thumb"
                      className={`object-contain max-h-14 transition-opacity ${
                        selectedIndex === index ? "opacity-100" : "opacity-70"
                      }`}
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className="lg:col-span-5 space-y-3">
              <h1 className="text-lg sm:text-xl font-semibold leading-6">
                {product.name}
              </h1>

              <div className="flex flex-wrap items-center gap-3 mt-2">
                <p className="text-[#d70018] text-2xl sm:text-3xl font-bold">
                  {converPriceToVN(product.newPrice)} ₫
                </p>
                {product.discount > 0 && (
                  <>
                    <p className="line-through text-gray-500">
                      {converPriceToVN(product.oldPrice)} ₫
                    </p>
                    <span className="bg-[#d70018] text-white px-2 py-1 text-xs rounded">
                      Giảm {product.discount}%
                    </span>
                  </>
                )}
              </div>

              <ul className="mt-2 text-sm space-y-1 lg:min-h-40">
                {product.attributes.map((item) => (
                  <li key={`attribute{${item.label}}`}>
                    - {item.label}:
                    <span className="font-semibold"> {item.value}</span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-col sm:flex-row items-stretch gap-3 mt-5">
                <Button className="flex-1 bg-[#d70018] h-full hover:bg-red-500">
                  <div className="text-center">
                    <p className="font-bold text-base">Mua ngay</p>
                    <p className="text-sm hidden sm:block">
                      Giao hàng trong 2h hoặc nhận tại cửa hàng
                    </p>
                  </div>
                </Button>
                <Button
                  variant="outline"
                  className="h-full basis-[60px] px-0 flex-grow-0 flex-shrink-0 border-2 border-[#d70018] hover:border-red-500"
                >
                  <div className="flex flex-col items-center">
                    <FaCartPlus className="text-[#d70018]" size={24} />
                    <p className="text-[8.5px] text-[#d70018] mt-1">
                      Thêm vào giỏ
                    </p>
                  </div>
                </Button>
              </div>
            </div>
          </>
        )}
        <div className="lg:col-span-3">
          <div className="bg-[#FFFAFA] rounded-2xl shadow border-2 border-gray-200">
            <CardContent className="space-y-4 text-sm p-5 font-semibold">
              <h2 className="text-center uppercase text-black border-b border-dashed pb-3">
                Hỗ trợ online
              </h2>

              <div>
                <p className="text-[#1a6dad] text-center mb-2">Hotline</p>
                <div className="flex items-center gap-4 flex-wrap">
                  <FaPhoneAlt className="text-[#1a6dad] text-2xl" />
                  <ul className="list-disc ml-4">
                    <li>0921.87.88.89</li>
                    <li>0922.87.88.89</li>
                  </ul>
                </div>
              </div>

              <div>
                <p className="text-[#1a6dad] text-center mb-2">
                  Thời gian làm việc
                </p>
                <div className="flex items-center gap-4 flex-wrap">
                  <FaRegClock className="text-[#1a6dad] text-2xl" />
                  <ul className="list-disc ml-4">
                    <li>T2 → T7 (9h đến 20h)</li>
                    <li>CN (9h đến 17h)</li>
                  </ul>
                </div>
              </div>

              <div>
                <p className="text-[#1a6dad] text-center mb-2">
                  Địa chỉ cửa hàng
                </p>
                <div className="flex items-center gap-4">
                  <FaMapMarkerAlt className="text-[#1a6dad] text-2xl" />
                  <span>10 đường số 3, cư xá Lữ Gia, P.15, Q.11, TP.HCM</span>
                </div>
              </div>
            </CardContent>
          </div>
        </div>
      </div>
      <div className="px-5">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 md:col-span-9">
            <div className="border border-gray-200 rounded-2xl p-6 shadow-sm text-sm text-gray-700 bg-white h-full">
              <h3 className="font-semibold text-lg mb-2">Thông tin sản phẩm</h3>
              {product?.description ? (
                <div
                  className="quill-content"
                  dangerouslySetInnerHTML={{ __html: product.description }}
                ></div>
              ) : (
                "Thông tin đang được cập nhật !"
              )}
            </div>
          </div>

          <div className="col-span-12 md:col-span-3">
            <div className="border border-gray-200 rounded-2xl p-6 shadow-sm text-sm text-gray-700 bg-white h-full">
              <h3 className="font-semibold text-lg mb-2">Thông số kỹ thuật</h3>
              <table className="w-full table-fixed">
                <tbody>
                  {product?.attributes.map((item, index) => (
                    <tr
                      key={index}
                      className={
                        index === product.attributes.length - 1
                          ? ""
                          : "border-b"
                      }
                    >
                      <td className="py-2 font-medium w-1/2">{item.label}</td>
                      <td className="py-2">{item.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <div className="px-5 mt-5">
        <h2 className="font-bold text-2xl capitalize mb-2">
          Sản phẩm liên quan
        </h2>
        <div className="py-2 ps-2 rounded-lg overflow-hidden">
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
            <CarouselContent className="ml-2 pr-[10px]">
              {randomProduct?.map((product) => (
                <CarouselItem
                  className="pl-2 basis-1/2  md:basis-1/3 lg:basis-1/4 xl:basis-1/5"
                  key={`product_${product.id}`}
                >
                  <ProductItem product={product} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-2" />
            <CarouselNext className="right-2" />
          </Carousel>
        </div>
      </div>
    </>
  );
}
