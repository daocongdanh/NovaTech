import useMessage from "@/hooks/useMessage";
import { getBrandById, updateBrand } from "@/services/brand.service";
import { BrandRequest } from "@/types/request.type";
import { Button, Form, Input } from "antd";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

export default function BrandUpdate() {
  const { id } = useParams();
  const [loading, setLoading] = useState<boolean>(false);
  const message = useMessage();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  useEffect(() => {
    const fetchApi = async () => {
      const res = await getBrandById(Number(id));
      form.setFieldsValue({
        name: res.name,
      });
    };
    fetchApi();
  }, []);
  const handleFinish = async (values: any) => {
    if (loading) return;
    setLoading(true);
    try {
      const brandRequest: BrandRequest = {
        name: values.name,
      };
      await updateBrand(Number(id), brandRequest);
      message.success("Cập nhật thương hiệu thành công");
      setTimeout(() => {
        navigate("/admin/brands");
      }, 500);
    } catch (err) {
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
        <h2 className="text-xl font-semibold mb-6">Cập nhật thương hiệu</h2>

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
              Cập nhật
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
}
