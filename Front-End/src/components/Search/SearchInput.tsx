import { useEffect, useMemo, useState, ChangeEvent } from "react";
import debounce from "lodash.debounce";
import { Input } from "antd";
import { FaSearch } from "react-icons/fa";

import { searchProductByName } from "@/services/product.service";
import { useLocation } from "react-router";
import { ProductResponse } from "@/types/response.type";
import { EmpytyProduct, SearchOutput } from "@/components/Search/SearchOutput";

export default function SearchInput() {
  const [products, setProducts] = useState<ProductResponse[]>([]);
  const [input, setInput] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const debounceFn = useMemo(
    () =>
      debounce((value: string) => {
        setSearchQuery(value);
      }, 200),
    []
  );

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInput(value);
    debounceFn(value);
  };

  const handleCancel = () => {
    setInput("");
    setSearchQuery("");
  };

  useEffect(() => {
    const fetchProduct = async () => {
      const data = await searchProductByName(searchQuery);
      setProducts(data);
    };

    if (searchQuery) fetchProduct();
    else setProducts([]);
  }, [searchQuery]);

  const location = useLocation();
  useEffect(() => {
    setInput("");
    setSearchQuery("");
    debounceFn.cancel?.();
  }, [location.pathname]);

  return (
    <div className="relative flex-1 h-full flex items-center justify-center">
      <div className="max-w-[500px] w-full text-gray-500 relative">
        <Input
          allowClear
          value={input}
          onChange={onChange}
          className="w-full px-4"
          prefix={<FaSearch />}
          placeholder="Bạn cần tìm gì"
          size="large"
        />

        {input && (
          <>
            <div onClick={handleCancel} className="fixed inset-0 z-40"></div>
            <div className="hidden sm:block absolute top-full left-0 w-full z-50 mt-2">
              <div className="bg-white text-black rounded-md shadow-lg overflow-hidden max-w-[500px] mx-auto">
                {!!products.length ? (
                  <SearchOutput
                    handleCancel={handleCancel}
                    products={products}
                  />
                ) : (
                  <EmpytyProduct />
                )}
              </div>
            </div>

            <div className="block sm:hidden fixed z-50 top-14 left-0 right-0 bottom-0">
              <div
                onClick={handleCancel}
                className="absolute left-0 top-0 w-full h-full bg-black opacity-50"
              />
              <div className="absolute top-1 left-0 right-0 px-[10px]">
                <div className="bg-white text-black rounded-md overflow-auto max-h-[80vh]">
                  {!!products.length ? (
                    <SearchOutput
                      handleCancel={handleCancel}
                      products={products}
                    />
                  ) : (
                    <EmpytyProduct />
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
