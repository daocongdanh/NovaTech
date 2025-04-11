import { Button, Form, Input, Upload, UploadFile, UploadProps } from "antd";
import { CameraOutlined } from "@ant-design/icons";
import { useState } from "react";
import useMessage from "@/hooks/useMessage";
import { upload } from "@/services/upload.service";
import { createCategory } from "@/services/category.service";
import { CategoryRequest } from "@/types/request.type";
import { useNavigate } from "react-router";
import { AxiosError } from "axios";

export default function CategoryAdd() {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const message = useMessage();
  const navigate = useNavigate();

  const handleFinish = async (values: any) => {
    let images: string[] = [];
    setLoading(true);
    try {
      if (fileList.length > 0) {
        const formData = new FormData();
        fileList.forEach((file: UploadFile) => {
          formData.append("files", file.originFileObj as Blob);
        });
        images = await upload(formData);
      }
      const categoryRequset: CategoryRequest = {
        name: values.name,
        image: images[0],
        active: true,
      };
      await createCategory(categoryRequset);
      message.success("Thêm mới danh mục thành công");
      navigate("/admin/categories");
    } catch (err: any) {
      const axiosError = err as AxiosError;
      const errorMsg = axiosError?.message || "Có lỗi xảy ra";
      message.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const onChange: UploadProps["onChange"] = ({
    file,
    fileList: newFileList,
  }) => {
    const isDuplicate = fileList.some(
      (f) => f.name === file.name && f.size === file.size
    );

    if (isDuplicate) return;

    if (newFileList.length > 1) {
      message.error("Chỉ được upload 1 ảnh");
      return;
    }

    setFileList(newFileList);
  };

  const handleRemove = async (file: UploadFile) => {
    setFileList((prev) => prev.filter((item) => item.uid !== file.uid));
  };
  return (
    <>
      {message.contextHolder}
      <div className="w-full p-6">
        <h2 className="text-xl font-semibold mb-6">Thêm danh mục</h2>

        <Form
          layout="vertical"
          form={form}
          onFinish={handleFinish}
          autoComplete="off"
        >
          <Form.Item
            label="Tên danh mục"
            name="name"
            rules={[{ required: true, message: "Vui lòng nhập tên danh mục" }]}
          >
            <Input placeholder="Nhập tên danh mục" />
          </Form.Item>

          <Form.Item
            label="Hình ảnh"
            name="image"
            rules={[{ required: true, message: "Vui lòng chọn hình ảnh" }]}
          >
            <Upload
              listType="picture-card"
              accept="image/*"
              fileList={fileList}
              onChange={onChange}
              onRemove={handleRemove}
              beforeUpload={() => false}
            >
              {fileList.length === 0 && (
                <div className="flex flex-col items-center">
                  <CameraOutlined className="text-[30px]" />
                  <h2 className="text-center font-[600] text-[13px]">
                    Thêm hình ảnh
                  </h2>
                </div>
              )}
            </Upload>
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
