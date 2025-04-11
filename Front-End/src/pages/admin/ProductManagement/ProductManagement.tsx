import { getAllProducts } from "@/services/product.service";
import { Page, ProductResponse } from "@/types/response.type";
import { Button, Tag, Tooltip, Input, Spin, Table } from "antd";
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router";
import { EditOutlined, PlusOutlined } from "@ant-design/icons";
import MyPagination from "@/components/MyPagination/MyPagination";
const { Search } = Input;
interface ProductTableItem {
  key: number;
  stt: number;
  name: string;
  thumbnail: string;
  price: number;
  discount: number;
  viewCount: number;
  quantity: number;
  category: string;
  brand: string;
  active: boolean;
  action: number;
}
export default function ProductManagement() {
  const [dataSource, setDataSource] = useState<ProductTableItem[]>([]);
  const [totalItem, setTotalItem] = useState(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchParams] = useSearchParams();
  const page = +(searchParams.get("page") || 1);
  const limit = +(searchParams.get("limit") || 10);
  useEffect(() => {
    const fetchApi = async () => {
      setLoading(true);
      try {
        const res = await getAllProducts(page, limit);
        console.log(res);
        setTotalItem(res.totalItem);
        setProductData(res.result);
      } finally {
        setLoading(false);
      }
    };
    fetchApi();
  }, [page, limit]);

  const setProductData = (data: ProductResponse[]) => {
    setDataSource(
      data.map((item, index) => {
        return {
          key: item.id,
          stt: (page - 1) * limit + index + 1,
          name: item.name,
          thumbnail: item.thumbnail,
          price: item.oldPrice,
          discount: item.discount,
          viewCount: item.viewCount,
          quantity: item.quantity,
          category: item.category.name,
          brand: item.brand.name,
          active: item.active,
          action: item.id,
        };
      })
    );
  };
  const columns = [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
    },
    {
      title: "Tên sản phẩm",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Hình ảnh",
      dataIndex: "thumbnail",
      key: "thumbnail",
      render: (thumbnail: string) => (
        <img src={thumbnail} alt="product" width={40} height={40} />
      ),
    },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
      render: (price: number) => <span>{price.toLocaleString("vi-VN")}₫</span>,
    },
    {
      title: "Giảm giá",
      dataIndex: "discount",
      key: "discount",
      render: (discount: number) => <span>{discount}%</span>,
    },
    {
      title: "Lượt xem",
      dataIndex: "viewCount",
      key: "viewCount",
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Danh mục",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Thương hiệu",
      dataIndex: "brand",
      key: "brand",
    },
    {
      title: "Trạng thái",
      dataIndex: "active",
      key: "active",
      render: (active: boolean) => (
        <Tag
          className="text-[14px] font-[500]"
          color={active ? "green" : "red"}
        >
          {active ? "Đang hoạt động" : "Ngừng hoạt động"}
        </Tag>
      ),
    },
    {
      title: "Hành động",
      dataIndex: "action",
      key: "action",
      render: (_: any, record: any) => (
        <Tooltip title="Cập nhật">
          <Link to={`update/${record.action}`}>
            <Button type="primary" ghost icon={<EditOutlined />} />
          </Link>
        </Tooltip>
      ),
    },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-[30px]">
        <div>
          <Search
            placeholder="Tìm kiếm theo tên..."
            allowClear
            // onSearch={searchByName}
            style={{
              width: 300,
              marginRight: "40px",
            }}
          />
        </div>
        <div>
          <Tooltip title="Thêm mới">
            <Link to={"add"}>
              <Button type="primary" ghost icon={<PlusOutlined />}>
                Thêm mới
              </Button>
            </Link>
          </Tooltip>
        </div>
      </div>
      {loading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "300px",
          }}
        >
          <Spin tip="Loading..." size="large" />
        </div>
      ) : (
        <>
          <Table
            dataSource={dataSource}
            columns={columns}
            pagination={false}
            style={{ fontSize: "16px" }}
            className="mb-5"
          />
          <MyPagination current={page} pageSize={limit} total={totalItem} />
        </>
      )}
    </div>
  );
}
