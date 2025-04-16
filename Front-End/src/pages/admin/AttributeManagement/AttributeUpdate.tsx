import useMessage from "@/hooks/useMessage";
import {
  getAttributeById,
  updateAttribute,
} from "@/services/attribute.service";
import { Button, Form, Input } from "antd";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
export default function AttributeUpdate() {
  const { id } = useParams();
  const [loading, setLoading] = useState<boolean>(false);
  const message = useMessage();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  useEffect(() => {
    const fetchApi = async () => {
      const res = await getAttributeById(Number(id));
      form.setFieldsValue({
        name: res.label,
      });
    };
    fetchApi();
  }, []);
  const handleFinish = async (values: any) => {
    if (loading) return;
    setLoading(true);
    try {
      await updateAttribute(Number(id), {
        label: values.name,
      });
      message.success("Cập nhật thuộc tính thành công");
      setTimeout(() => {
        navigate("/admin/attributes");
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
        <h2 className="text-xl font-semibold mb-6">Cập nhật thuộc tính</h2>

        <Form
          layout="vertical"
          form={form}
          onFinish={handleFinish}
          autoComplete="off"
          disabled={loading}
        >
          <Form.Item
            label="Tên thuộc tính"
            name="name"
            rules={[
              { required: true, message: "Vui lòng nhập tên thuộc tính" },
            ]}
          >
            <Input placeholder="Nhập tên thuộc tính" />
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
