import useMessage from "@/hooks/useMessage";
import { getAllBrands } from "@/services/brand.service";
import {
  createCategoryBrand,
  getAllCategory,
} from "@/services/category.service";
import { BrandResponse, CategoryResponse } from "@/types/response.type";
import { Button, Form, Select } from "antd";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
export default function CategoryBrandAdd() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState<boolean>(false);
  const [categories, setCategories] = useState<CategoryResponse[]>([]);
  const [brands, setBrands] = useState<BrandResponse[]>([]);
  const message = useMessage();
  const navigate = useNavigate();
  useEffect(() => {
    const fetchApi = async () => {
      const categoriesRes = await getAllCategory();
      const brandsRes = await getAllBrands(1, 1000);
      setCategories(categoriesRes);
      setBrands(brandsRes.result);
    };
    fetchApi();
  }, []);
  const handleFinish = async (values: any) => {
    if (loading) return;
    setLoading(true);
    try {
      await createCategoryBrand({
        categoryId: values.category,
        brandId: values.brand,
      });
      message.success("Thêm mới thành công");
      setTimeout(() => {
        navigate("/admin/category-brands");
      }, 500);
    } catch (err: any) {
      const axiosError = err as AxiosError;
      const errorMsg = axiosError?.message || "Có lỗi xảy ra";
      message.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      {message.contextHolder}
      <div className="w-full p-6">
        <h2 className="text-xl font-semibold mb-6">
          Thêm thương hiệu liên kết với danh mục
        </h2>
        {(brands.length > 0 || categories.length > 0) && (
          <Form
            layout="vertical"
            form={form}
            onFinish={handleFinish}
            autoComplete="off"
            disabled={loading}
          >
            <Form.Item
              name="category"
              rules={[{ required: true, message: "Vui lòng chọn danh mục" }]}
            >
              <Select
                placeholder="Chọn danh mục"
                options={categories.map((item) => {
                  return {
                    value: item.id,
                    label: item.name,
                  };
                })}
              />
            </Form.Item>
            <Form.Item
              name="brand"
              rules={[{ required: true, message: "Vui lòng chọn thương hiệu" }]}
            >
              <Select
                placeholder="Chọn thương hiệu"
                options={brands.map((item) => {
                  return {
                    value: item.id,
                    label: item.name,
                  };
                })}
              />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" loading={loading}>
                Thêm mới
              </Button>
            </Form.Item>
          </Form>
        )}
      </div>
    </>
  );
}
