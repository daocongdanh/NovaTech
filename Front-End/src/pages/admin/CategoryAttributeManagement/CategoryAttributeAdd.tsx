import useMessage from "@/hooks/useMessage";
import { getAllAttributesWithPagination } from "@/services/attribute.service";
import {
  createCategoryAttribute,
  getAllCategory,
} from "@/services/category.service";
import { Attribute, CategoryResponse } from "@/types/response.type";
import { Button, Form, Select } from "antd";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
export default function CategoryAttributeAdd() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState<boolean>(false);
  const [categories, setCategories] = useState<CategoryResponse[]>([]);
  const [attributes, setAttributes] = useState<Attribute[]>([]);
  const message = useMessage();
  const navigate = useNavigate();
  useEffect(() => {
    const fetchApi = async () => {
      const categoriesRes = await getAllCategory();
      const attributesRes = await getAllAttributesWithPagination(1, 1000);
      setCategories(categoriesRes);
      setAttributes(attributesRes.result);
    };
    fetchApi();
  }, []);
  const handleFinish = async (values: any) => {
    if (loading) return;
    setLoading(true);
    try {
      await createCategoryAttribute({
        categoryId: values.category,
        attributeId: values.attribute,
      });
      message.success("Thêm mới thành công");
      setTimeout(() => {
        navigate("/admin/category-attributes");
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
          Thêm thuộc tính liên kết với danh mục
        </h2>
        {(attributes.length > 0 || categories.length > 0) && (
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
              name="attribute"
              rules={[{ required: true, message: "Vui lòng chọn thuộc tính" }]}
            >
              <Select
                placeholder="Chọn thuộc tính"
                options={attributes.map((item) => {
                  return {
                    value: item.id,
                    label: item.label,
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
