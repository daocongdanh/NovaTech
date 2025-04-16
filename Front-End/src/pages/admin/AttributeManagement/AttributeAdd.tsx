import useMessage from "@/hooks/useMessage";
import { createAttribute } from "@/services/attribute.service";

import { Button, Form, Input } from "antd";
import { AxiosError } from "axios";
import { useState } from "react";
import { useNavigate } from "react-router";

export default function AttributeAdd() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState<boolean>(false);
  const message = useMessage();
  const navigate = useNavigate();
  const handleFinish = async (values: any) => {
    if (loading) return;
    setLoading(true);
    try {
      await createAttribute({
        label: values.name,
      });
      message.success("Thêm mới thuộc tính thành công");
      setTimeout(() => {
        navigate("/admin/attributes");
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
        <h2 className="text-xl font-semibold mb-6">Thêm thuộc tính</h2>

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
              Thêm mới
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
}
