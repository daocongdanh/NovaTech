import useMessage from "@/hooks/useMessage";
import {
  addImageProduct,
  deleteImageProduct,
  getProductById,
  updateProduct,
} from "@/services/product.service";
import {
  AttributeForProductRequest,
  ProductRequest,
} from "@/types/request.type";
import { CameraOutlined } from "@ant-design/icons";
import {
  Attribute,
  BrandResponse,
  CategoryResponse,
  ProductAttributeResponse,
} from "@/types/response.type";
import {
  Form,
  Input,
  InputNumber,
  Select,
  Button,
  Upload,
  UploadFile,
  UploadProps,
  Popconfirm,
} from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
const { TextArea } = Input;
const { Option } = Select;
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import { getAllCategory } from "@/services/category.service";
import { getbrandsByCategory } from "@/services/brand.service";
import { getAttributeByCategory } from "@/services/attribute.service";
import { AxiosError } from "axios";
import { upload } from "@/services/upload.service";

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
export default function ProductUpdate() {
  const { id } = useParams();
  const [form] = Form.useForm();
  const [thumbnailList, setThumbnailList] = useState<UploadFile[]>([]);
  const [imageList, setImagelList] = useState<UploadFile[]>([]);
  const [categories, setCategories] = useState<CategoryResponse[]>([]);
  const [brands, setBrands] = useState<BrandResponse[]>([]);
  const [brandCache, setBrandCache] = useState<Record<string, number | null>>(
    {}
  );
  const [attributeCache, setAttributeCache] = useState<
    Record<string, Record<string, string>>
  >({});
  const [attributes, setAttributes] = useState<Attribute[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [attributeRequest, setAttributeRequest] = useState<
    AttributeForProductRequest[]
  >([]);
  const message = useMessage();
  const navigate = useNavigate();
  useEffect(() => {
    const fetchApi = async () => {
      const productRes = await getProductById(Number(id));
      const categoriesRes = await getAllCategory();
      setCategories(categoriesRes);
      form.setFieldsValue({
        name: productRes.name,
        oldPrice: productRes.oldPrice,
        newPrice: productRes.newPrice,
        discount: productRes.discount,
        note: productRes.note,
        description: productRes.description,
        quantity: productRes.quantity,
        active: productRes.active,
        categorySlug: productRes.category.slug,
        brandId: productRes.brand.id,
      });
      handleCategoryChage(
        productRes.category.slug,
        productRes.brand.id,
        productRes.attributes
      );
      console.log(productRes);
      setThumbnailList([
        {
          uid: "raw-thumbnail",
          name: "thumbnail",
          status: "done",
          thumbUrl: productRes.thumbnail,
        },
      ]);
      setImagelList(
        productRes.images.map((item, index) => {
          return {
            uid: String(item.id),
            name: `image-${index}`,
            status: "done",
            thumbUrl: item.imageUrl,
          };
        })
      );
      setAttributeRequest(
        productRes.attributes.map((item) => {
          return {
            attributeId: item.attributeId,
            value: item.value,
          };
        })
      );
    };
    fetchApi();
  }, []);
  const handleCategoryChage = async (
    slug: string,
    selectedBrandId?: number,
    attributeValues?: ProductAttributeResponse[]
  ) => {
    // Lấy danh sách brand & attributes theo category
    const brandRes = await getbrandsByCategory(slug);
    const attributeRes = await getAttributeByCategory(slug);
    setBrands(brandRes);
    setAttributes(attributeRes);

    // Nếu là lần đầu load (khi edit sản phẩm)
    if (selectedBrandId !== undefined && attributeValues) {
      // ⚡ Cache brand
      setBrandCache((prev) => ({ ...prev, [slug]: selectedBrandId }));

      // ⚡ Cache attributes
      const attrMap: Record<string, string> = {};
      attributeValues.forEach((attr) => {
        attrMap[attr.slug] = attr.value;
      });
      setAttributeCache((prev) => ({ ...prev, [slug]: attrMap }));

      // ⚡ Set giá trị vào form
      form.setFieldsValue({
        brandId: selectedBrandId,
        ...attrMap,
      });
    } else {
      // Khi user thay đổi category

      // 🧹 Reset brand
      form.setFieldsValue({ brandId: null });

      // 🧹 Reset tất cả attributes hiện tại
      const resetAttrs: Record<string, any> = {};
      attributeRes.forEach((attr) => {
        resetAttrs[attr.label] = undefined;
      });
      form.setFieldsValue(resetAttrs);

      // ✅ Nếu có cache → set lại brand + attribute
      const cachedBrand = brandCache[slug];
      const cachedAttrs = attributeCache[slug];

      if (cachedBrand !== undefined) {
        form.setFieldsValue({ brandId: cachedBrand });
      }

      if (cachedAttrs) {
        form.setFieldsValue(cachedAttrs);
      }
      setAttributeRequest([]);
    }
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

  const onChange = (type: string): UploadProps["onChange"] => {
    return async ({ file, fileList: newFileList }) => {
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
        try {
          const formData = new FormData();
          if (file instanceof File) {
            formData.append("files", file);
          }
          const images = await upload(formData);
          console.log(images[0]);
          await addImageProduct(Number(id), images[0]);
          setImagelList(newFileList);
        } catch (err: any) {
          const axiosError = err as AxiosError;
          const errorMsg = axiosError?.message || "Có lỗi xảy ra";
          message.error(errorMsg);
        }
      }
    };
  };

  const handleRemove = (type: string) => async (file: UploadFile) => {
    if (type === "thumbnail") {
      setThumbnailList((prev) => prev.filter((item) => item.uid !== file.uid));
    } else if (type === "images") {
      setImagelList((prev) => prev.filter((item) => item.uid !== file.uid));
    }
  };
  const handleFinish = async (values: any) => {
    if (loading) return;
    if (thumbnailList.length === 0) {
      message.error("Vui lòng chọn ảnh đại diện");
      return;
    }
    setLoading(true);
    try {
      let thumbnail: string;
      const file: UploadFile = thumbnailList[0];
      if (file.uid === "raw-thumbnail") {
        thumbnail = file.thumbUrl ?? "";
      } else {
        const formData = new FormData();
        thumbnailList.forEach((file: UploadFile) => {
          formData.append("files", file.originFileObj as Blob);
        });
        const res = await upload(formData);
        thumbnail = res[0];
      }

      const productRequest: ProductRequest = {
        name: values.name,
        thumbnail: thumbnail,
        oldPrice: values.oldPrice,
        newPrice: values.newPrice,
        note: values.note,
        description: values.description,
        quantity: values.quantity,
        active: values.active,
        categorySlug: values.categorySlug,
        brandId: values.brandId,
        attributes: attributeRequest,
      };
      await updateProduct(Number(id), productRequest);
      message.success("Cập nhật sản phẩm thành công");
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
  const handleRemoveImages = async (file: any) => {
    try {
      await deleteImageProduct(Number(id), Number(file.uid));
      setImagelList((prev) => prev.filter((item) => item.uid !== file.uid));
    } catch (err: any) {
      const axiosError = err as AxiosError;
      const errorMsg = axiosError?.message || "Có lỗi xảy ra";
      message.error(errorMsg);
    }
  };
  const customItemRender = (originNode: any, file: any) => {
    return React.cloneElement(originNode, {
      children: originNode.props.children.map((child: any, index: any) => {
        if (index === 3) {
          return (
            <Popconfirm
              title="Bạn có chắc chắn muốn xóa ảnh này không?"
              onConfirm={() => {
                handleRemoveImages(file);
              }}
              okText="Có"
              cancelText="Không"
            >
              {child}
            </Popconfirm>
          );
        }
        return child;
      }),
    });
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

          <Form.Item label="Ảnh đại diện" name="thumbnail">
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
              // onRemove={handleRemove("images")}
              itemRender={customItemRender}
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

          <Form.Item
            label="Danh mục"
            name="categorySlug"
            rules={[{ required: true, message: "Vui lòng chọn danh mục" }]}
          >
            <Select
              placeholder="Chọn danh mục"
              onChange={(slug) => handleCategoryChage(slug)}
            >
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
              Cập nhật
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
}
