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
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { CameraOutlined } from "@ant-design/icons";
import {
  Attribute,
  BrandResponse,
  CategoryResponse,
} from "@/types/response.type";
import { getAllCategory } from "@/services/category.service";
import { getbrandsByCategory } from "@/services/brand.service";
import { getAttributeByCategory } from "@/services/attribute.service";
import {
  AttributeForProductRequest,
  ProductRequest,
} from "@/types/request.type";
import { AxiosError } from "axios";
import { upload } from "@/services/upload.service";
import { createProduct } from "@/services/product.service";
const { TextArea } = Input;
const { Option } = Select;
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
export default function ProductAdd() {
  const [form] = Form.useForm();
  const [thumbnailList, setThumbnailList] = useState<UploadFile[]>([]);
  const [imageList, setImagelList] = useState<UploadFile[]>([]);
  const [categories, setCategories] = useState<CategoryResponse[]>([]);
  const [brands, setBrands] = useState<BrandResponse[]>([]);
  const [attributes, setAttributes] = useState<Attribute[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [attributeRequest, setAttributeRequest] = useState<
    AttributeForProductRequest[]
  >([]);
  const message = useMessage();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchApi = async () => {
      const res = await getAllCategory(true);
      setCategories(res);
    };
    fetchApi();
  }, []);

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

  const handleCategoryChage = async (slug: string) => {
    form.setFieldsValue({
      brandId: null,
    });
    const brandRes = await getbrandsByCategory(slug);
    const attributeRes = await getAttributeByCategory(slug);
    setBrands(brandRes);
    setAttributes(attributeRes);
    setAttributeRequest([]);
  };

  const handleChangeAttribute = (
    e: React.ChangeEvent<HTMLInputElement>,
    item: Attribute
  ) => {
    const { value } = e.target;

    setAttributeRequest((prev) => {
      const existingIndex = prev.findIndex(
        (attr) => attr.attributeId === item.id
      );

      if (existingIndex !== -1) {
        const updated = [...prev];
        updated[existingIndex].value = value;
        return updated;
      } else {
        return [...prev, { attributeId: item.id, value }];
      }
    });
  };
  const handleFinish = async (values: any) => {
    if (loading) return;
    setLoading(true);
    try {
      let thumbnails: string[] = [];
      let images: string[] = [];
      if (thumbnailList.length > 0) {
        const formData = new FormData();
        thumbnailList.forEach((file: UploadFile) => {
          formData.append("files", file.originFileObj as Blob);
        });
        thumbnails = await upload(formData);
      }
      if (imageList.length > 0) {
        const formData = new FormData();
        imageList.forEach((file: UploadFile) => {
          formData.append("files", file.originFileObj as Blob);
        });
        images = await upload(formData);
      }
      const productRequest: ProductRequest = {
        name: values.name,
        thumbnail: thumbnails[0],
        images: images,
        oldPrice: values.oldPrice,
        newPrice: values.newPrice,
        note: values.note,
        description: values.description,
        quantity: values.quantity,
        active: true,
        categorySlug: values.categorySlug,
        brandId: values.brandId,
        attributes: attributeRequest,
      };
      console.log(productRequest);
      await createProduct(productRequest);
      message.success("Thêm sản phẩm mới thành công");
      setTimeout(() => {
        navigate("/admin");
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
        <h2 className="text-xl font-semibold mb-6">Thêm Sản phẩm</h2>

        <Form
          layout="vertical"
          form={form}
          onFinish={handleFinish}
          autoComplete="off"
          disabled={loading}
          initialValues={{
            price: 0,
            discount: 0,
            quantity: 0,
          }}
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
          <Form.Item label="Hình ảnh" name="images">
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
            label="Giá cũ"
            name="oldPrice"
            rules={[{ required: true, message: "Vui lòng nhập giá cũ" }]}
          >
            <InputNumber
              placeholder="Nhập giá cũ"
              min={0}
              style={{ width: "100%" }}
            />
          </Form.Item>
          <Form.Item
            label="Giá mới"
            name="newPrice"
            rules={[{ required: true, message: "Vui lòng nhập giá mới" }]}
          >
            <InputNumber
              placeholder="Nhập giá mới"
              min={0}
              style={{ width: "100%" }}
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
            />
          </Form.Item>

          <Form.Item
            label="Ghi chú"
            name="note"
            rules={[{ required: true, message: "Vui lòng nhập ghi chú" }]}
          >
            <TextArea rows={4} placeholder="Nhập ghi chú sản phẩm (nếu có)" />
          </Form.Item>
          <Form.Item
            label="Mô tả chi tiết"
            name="description"
            rules={[
              {
                required: true,
                validator: (_, value) => {
                  const isEmpty =
                    !value ||
                    value.replace(/<[^>]*>|&nbsp;/g, "").trim() === "" ||
                    value === "<p><br></p>";
                  if (isEmpty) {
                    return Promise.reject("Vui lòng nhập mô tả");
                  }
                  return Promise.resolve();
                },
              },
            ]}
          >
            <ReactQuill
              theme="snow"
              modules={modules}
              formats={formats}
              onChange={(value) => {
                form.setFieldsValue({ description: value });
                form.validateFields(["description"]);
              }}
            />
          </Form.Item>

          <Form.Item
            label="Danh mục"
            name="categorySlug"
            rules={[{ required: true, message: "Vui lòng chọn danh mục" }]}
          >
            <Select placeholder="Chọn danh mục" onChange={handleCategoryChage}>
              {categories.map((item) => (
                <Option key={`category${item.id}`} value={item.slug}>
                  {item.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          {brands.length > 0 && (
            <Form.Item
              label="Thương hiệu"
              name="brandId"
              rules={[{ required: true, message: "Vui lòng chọn thương hiệu" }]}
            >
              <Select placeholder="Chọn thương hiệu">
                {brands.map((item) => (
                  <Option key={`brand${item.id}`} value={item.id}>
                    {item.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          )}
          {attributes.length > 0 &&
            attributes.map((item) => (
              <Form.Item
                label={item.label}
                name={item.slug}
                rules={[
                  {
                    required: true,
                    message: `Vui lòng nhập tên ${item.label}`,
                  },
                ]}
                key={`attribute${item.id}`}
              >
                <Input
                  placeholder={`Nhập ${item.label}`}
                  onChange={(e) => handleChangeAttribute(e, item)}
                />
              </Form.Item>
            ))}

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
