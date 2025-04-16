import useMessage from "@/hooks/useMessage";
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
import { ArticleRequest } from "@/types/request.type";
import { AxiosError } from "axios";
import { getArticleById, updateArticle } from "@/services/article.service";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
const modules = {
  toolbar: [
    [{ size: [] }],
    [
      {
        color: [
          "black",
          "red",
          "blue",
          "green",
          "orange",
          "purple",
          "gray",
          "brown",
          "pink",
          "teal",
        ],
      },
    ],
    [{ align: [] }],
    ["bold", "italic", "underline", "strike"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["clean"],
  ],
};

const formats = [
  "size",
  "color",
  "align",
  "bold",
  "italic",
  "underline",
  "strike",
  "list",
  "bullet",
];
export default function ArticleUpdate() {
  const { id } = useParams();
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const message = useMessage();
  const navigate = useNavigate();
  const [form] = Form.useForm();

  useEffect(() => {
    const fetchApi = async () => {
      const res = await getArticleById(Number(id));
      console.log(res);
      form.setFieldsValue({
        title: res.title,
        content: res.content,
        active: res.active,
      });
      setFileList([
        {
          uid: "raw",
          name: "Image 1",
          status: "done",
          thumbUrl: res.thumbnail,
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
    if (loading) return;
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
      const articleRequest: ArticleRequest = {
        title: values.title,
        thumbnail: image,
        content: values.content,
        active: values.active,
      };
      await updateArticle(Number(id), articleRequest);
      message.success("Cập nhật danh mục thành công");
      setTimeout(() => {
        navigate("/admin/articles");
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
        <h2 className="text-xl font-semibold mb-6">Cập nhật bài viết</h2>

        <Form
          layout="vertical"
          form={form}
          onFinish={handleFinish}
          autoComplete="off"
          disabled={loading}
        >
          <Form.Item
            label="Tiêu đề"
            name="title"
            rules={[{ required: true, message: "Vui lòng nhập tiêu đề" }]}
          >
            <Input placeholder="Nhập tiêu đề" />
          </Form.Item>

          <Form.Item label="Hình ảnh" name="image">
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
          <Form.Item
            label="Nội dung bài viết"
            name="content"
            rules={[
              {
                required: true,
                validator: (_, value) => {
                  const isEmpty =
                    !value ||
                    value.replace(/<[^>]*>|&nbsp;/g, "").trim() === "" ||
                    value === "<p><br></p>";
                  if (isEmpty) {
                    return Promise.reject("Vui lòng nhập nội dung bài viết");
                  }
                  return Promise.resolve();
                },
              },
            ]}
            style={{ height: "360px" }}
          >
            <ReactQuill
              theme="snow"
              modules={modules}
              formats={formats}
              onChange={(value) => {
                form.setFieldsValue({ content: value });
                form.validateFields(["content"]);
              }}
              style={{
                height: "300px",
              }}
            />
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
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              className="mt-4"
            >
              Cập nhật
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
}
