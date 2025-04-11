import useMessage from "@/hooks/useMessage";
import {
  Form,
  Input,
  InputNumber,
  Select,
  Button,
  Upload,
  UploadFile,
  UploadProps,
} from "antd";
import { useState } from "react";
import { useNavigate } from "react-router";
import { CameraOutlined } from "@ant-design/icons";
const { TextArea } = Input;
const { Option } = Select;

export default function ProductAdd() {
  const [form] = Form.useForm();
  const [thumbnailList, setThumbnailList] = useState<UploadFile[]>([]);
  const [imageList, setImagelList] = useState<UploadFile[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const message = useMessage();
  const navigate = useNavigate();

  const onChange =
    (type: string): UploadProps["onChange"] =>
    ({ file, fileList: newFileList }) => {
      if (type === "thumbnail") {
        const isDuplicate = thumbnailList.some(
          (f) => f.name === file.name && f.size === file.size
        );

        if (isDuplicate) return;

        if (newFileList.length > 1) {
          message.error("Chỉ được upload 1 ảnh");
          return;
        }
        setThumbnailList(newFileList);
      } else if (type === "images") {
        const isDuplicate = imageList.some(
          (f) => f.name === file.name && f.size === file.size
        );

        if (isDuplicate) return;

        if (newFileList.length > 4) {
          message.error("Chỉ được upload tối đa 4 ảnh");
          return;
        }
        setImagelList(newFileList);
      }
    };

  const handleRemove = (type: string) => async (file: UploadFile) => {
    if (type === "thumbnail") {
      setThumbnailList((prev) => prev.filter((item) => item.uid !== file.uid));
    } else if (type === "images") {
      setImagelList((prev) => prev.filter((item) => item.uid !== file.uid));
    }
  };
  return (
    <>
      {message.contextHolder}
      <div className="w-full p-6">
        <h2 className="text-xl font-semibold mb-6">Thêm Sản phẩm</h2>

        <Form
          layout="vertical"
          form={form}
          // onFinish={handleFinish}
          autoComplete="off"
        >
          <Form.Item
            label="Tên sản phẩm"
            name="name"
            rules={[{ required: true, message: "Vui lòng nhập tên sản phẩm" }]}
          >
            <Input placeholder="Nhập tên sản phẩm" />
          </Form.Item>

          <Form.Item
            label="Ảnh đại diện"
            name="thumbnail"
            rules={[{ required: true, message: "Vui lòng chọn ảnh đại diện" }]}
          >
            <Upload
              listType="picture-card"
              accept="image/*"
              fileList={thumbnailList}
              onChange={onChange("thumbnail")}
              onRemove={handleRemove("thumbnail")}
              beforeUpload={() => false}
            >
              {thumbnailList.length === 0 && (
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
            label="Hình ảnh"
            name="images"
            rules={[{ required: true, message: "Vui lòng chọn ảnh hình ảnh" }]}
          >
            <Upload
              listType="picture-card"
              accept="image/*"
              fileList={imageList}
              onChange={onChange("images")}
              multiple
              onRemove={handleRemove("images")}
              beforeUpload={() => false}
            >
              {imageList.length < 4 && (
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
            label="Giá"
            name="price"
            rules={[{ required: true, message: "Vui lòng nhập giá" }]}
          >
            <InputNumber
              placeholder="Nhập giá"
              min={0}
              defaultValue={0}
              style={{ width: "100%" }}
            />
          </Form.Item>

          <Form.Item
            label="Giảm giá (%)"
            name="discount"
            rules={[{ required: true, message: "Vui lòng nhập giảm giá" }]}
          >
            <InputNumber
              placeholder="Nhập phần trăm giảm giá"
              min={0}
              max={100}
              style={{ width: "100%" }}
              defaultValue={0}
            />
          </Form.Item>
          <Form.Item
            label="Số lượng"
            name="quantity"
            rules={[{ required: true, message: "Vui lòng nhập số lượng" }]}
          >
            <InputNumber
              placeholder="Nhập số lượng"
              min={0}
              style={{ width: "100%" }}
              defaultValue={0}
            />
          </Form.Item>
          {/* <Form.Item
            label="Mô tả chi tiết"
            name="description"
            rules={[{ required: true, message: "Vui lòng nhập mô tả" }]}
          >
            <ReactQuill
              theme="snow"
              placeholder="Nhập mô tả chi tiết sản phẩm"
              // onChange={(value) => form.setFieldValue("description", value)}
            />
          </Form.Item> */}

          <Form.Item
            label="Ghi chú"
            name="note"
            rules={[{ required: true, message: "Vui lòng nhập ghi chú" }]}
          >
            <TextArea rows={4} placeholder="Nhập ghi chú sản phẩm (nếu có)" />
          </Form.Item>

          <Form.Item
            label="Danh mục"
            name="categoryId"
            rules={[{ required: true, message: "Vui lòng chọn danh mục" }]}
          >
            <Select placeholder="Chọn danh mục">
              {/* {categoryList.map((category) => (
                <Option key={category.id} value={category.id}>
                  {category.name}
                </Option>
              ))} */}
            </Select>
          </Form.Item>

          <Form.Item
            label="Thương hiệu"
            name="brandId"
            rules={[{ required: true, message: "Vui lòng chọn thương hiệu" }]}
          >
            <Select placeholder="Chọn thương hiệu">
              {/* {brandList.map((brand) => (
                <Option key={brand.id} value={brand.id}>
                  {brand.name}
                </Option>
              ))} */}
            </Select>
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
