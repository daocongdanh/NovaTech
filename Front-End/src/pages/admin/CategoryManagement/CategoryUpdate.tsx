import useMessage from "@/hooks/useMessage";
import { getCategoryById, updateCategory } from "@/services/category.service";
import {
  Button,
  Form,
  Input,
  Select,
  Upload,
  UploadFile,
  UploadProps,
} from "antd";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { CameraOutlined } from "@ant-design/icons";
import { upload } from "@/services/upload.service";
import { CategoryRequest } from "@/types/request.type";
import { AxiosError } from "axios";
export default function CategoryUpdate() {
  const { id } = useParams();
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const message = useMessage();
  const navigate = useNavigate();
  const [form] = Form.useForm();

  useEffect(() => {
    const fetchApi = async () => {
      const res = await getCategoryById(Number(id));
      form.setFieldsValue({
        name: res.name,
        active: res.active,
      });
      setFileList([
        {
          uid: "raw",
          name: "Image 1",
          status: "done",
          thumbUrl: res.image,
        },
      ]);
    };
    fetchApi();
  }, []);

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

  const handleFinish = async (values: any) => {
    if (fileList.length === 0) {
      message.error("Vui lòng chọn hình ảnh");
      return;
    }
    const file: UploadFile = fileList[0];
    let image: string;
    setLoading(true);
    try {
      if (file.uid === "raw") {
        image = file.thumbUrl ?? "";
      } else {
        const formData = new FormData();
        fileList.forEach((file: UploadFile) => {
          formData.append("files", file.originFileObj as Blob);
        });
        const res = await upload(formData);
        image = res[0];
      }
      const categoryRequset: CategoryRequest = {
        name: values.name,
        image: image,
        active: values.active,
      };
      await updateCategory(Number(id), categoryRequset);
      message.success("Cập nhật danh mục thành công");
      navigate("/admin/categories");
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
        <h2 className="text-xl font-semibold mb-6">Cập nhật danh mục</h2>

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

          <Form.Item label="Hình ảnh" name="image">
            <Upload
              listType="picture-card"
              accept="image/*"
              fileList={fileList}
              onChange={onChange}
              multiple
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

          <Form.Item label="Trạng thái" name="active">
            <Select
              options={[
                {
                  value: true,
                  label: "Đang hoạt động",
                },
                {
                  value: false,
                  label: "Ngừng hoạt động",
                },
              ]}
            />
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
