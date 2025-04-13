import useMessage from "@/hooks/useMessage";
import { createBrand } from "@/services/brand.service";
import { BrandRequest } from "@/types/request.type";
import { Button, Form, Input } from "antd";
import { AxiosError } from "axios";
import { useState } from "react";
import { useNavigate } from "react-router";

export default function BrandAdd() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState<boolean>(false);
  const message = useMessage();
  const navigate = useNavigate();
  const handleFinish = async (values: any) => {
    if (loading) return;
    setLoading(true);
    try {
      const brandRequest: BrandRequest = {
        name: values.name,
      };
      await createBrand(brandRequest);
      message.success("Thêm mới thương hiệu thành công");
      setTimeout(() => {
        navigate("/admin/brands");
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
        <h2 className="text-xl font-semibold mb-6">Thêm thương hiệu</h2>

        <Form
          layout="vertical"
          form={form}
          onFinish={handleFinish}
          autoComplete="off"
          disabled={loading}
        >
          <Form.Item
            label="Tên thương hiệu"
            name="name"
            rules={[
              { required: true, message: "Vui lòng nhập tên thương hiệu" },
            ]}
          >
            <Input placeholder="Nhập tên thương hiệu" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>
              Thêm mới
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
}
