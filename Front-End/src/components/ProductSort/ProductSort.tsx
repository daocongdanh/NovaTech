import { JSX, useEffect, useState } from "react";
import { Button } from "antd";
import { useLocation, useNavigate } from "react-router";
import { FaAnglesDown, FaAnglesUp } from "react-icons/fa6";
import { GrView } from "react-icons/gr";
import { HiMiniGift } from "react-icons/hi2";

const sorter: {
  name: string;
  order: string;
  icon: JSX.Element;
  label: string;
}[] = [
  {
    name: "price",
    order: ":desc",
    icon: <FaAnglesDown />,
    label: "Giá Cao-Thấp",
  },
  {
    name: "price",
    order: ":asc",
    icon: <FaAnglesUp />,
    label: "Giá Thấp-Cao",
  },
  {
    name: "discount",
    order: ":desc",
    icon: <HiMiniGift />,
    label: "Khuyến mãi hot",
  },
  {
    name: "viewCount",
    order: ":desc",
    icon: <GrView />,
    label: "Xem nhiều",
  },
];

export default function ProductSort() {
  const [sortActive, setSortActive] = useState<number>(-1);
  const navigate = useNavigate();
  const location = useLocation();

  // Khởi tạo sort từ query string nếu có
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const currentSort = params.get("sort");
    if (currentSort) {
      const index = sorter.findIndex(
        (item) => `${item.name}${item.order}` === currentSort
      );
      setSortActive(index);
    } else {
      setSortActive(-1);
    }
  }, [location.search]);

  const onDelete = () => {
    setSortActive(-1);
    const params = new URLSearchParams(location.search);
    params.delete("sort");
    navigate(`${location.pathname}?${params.toString()}`, { replace: true });
  };

  const onSet = (name: string, index: number) => {
    setSortActive(index);
    const params = new URLSearchParams(location.search);
    params.set("sort", name);
    navigate(`${location.pathname}?${params.toString()}`, { replace: true });
  };

  const onChange = (name: string, index: number) => {
    if (index === sortActive) onDelete();
    else onSet(name, index);
  };

  return (
    <>
      <h2 className="text-lg font-bold">Sắp xếp theo</h2>
      <div className="w-full overflow-auto no-scrollbar">
        <div className="flex gap-3">
          {sorter.map((item, index) => (
            <Button
              key={index}
              icon={item.icon}
              danger={index === sortActive}
              onClick={() => onChange(`${item.name}${item.order}`, index)}
            >
              {item.label}
            </Button>
          ))}
        </div>
      </div>
    </>
  );
}
