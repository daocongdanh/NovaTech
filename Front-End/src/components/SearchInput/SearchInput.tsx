import { Input } from "antd";
import { FaSearch } from "react-icons/fa";

export default function SearchInput() {
  return (
    <div>
      <div className="flex-1 h-full flex items-center justify-center">
        <div className="max-w-[500px] w-full text-gray-500">
          <Input
            allowClear
            className="w-full px-4"
            prefix={<FaSearch className="text-gray-500" />}
            placeholder="Bạn cần tìm gì"
            size="large"
          />
        </div>
      </div>
    </div>
  );
}
