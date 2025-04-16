import { CategoryBrand } from "@/types/response.type";
import { Button, Spin, Table, Tooltip, Input, Popconfirm } from "antd";
import { useEffect, useState } from "react";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { Link, useSearchParams } from "react-router";
import MyPagination from "@/components/MyPagination/MyPagination";
import useMessage from "@/hooks/useMessage";
import { AxiosError } from "axios";
import {
  deleteCategoryAttribute,
  deleteCategoryBrand,
  getAllCategoryBrands,
} from "@/services/category.service";
const { Search } = Input;
interface CategoryBrandTableItem {
  key: number;
  stt: number;
  category: string;
  brand: string;
  action: number;
}
export default function CategoryBrandManagement() {
  const [dataSource, setDataSource] = useState<CategoryBrandTableItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [totalItem, setTotalItem] = useState(0);
  const [searchParams] = useSearchParams();
  const [reload, setReload] = useState<boolean>(false);
  const page = +(searchParams.get("page") || 1);
  const limit = +(searchParams.get("limit") || 10);
  const message = useMessage();

  useEffect(() => {
    const fetchApi = async () => {
      setLoading(true);
      try {
        const res = await getAllCategoryBrands(page, limit);
        setTotalItem(res.totalItem);
        setCategoryBrandData(res.result);
      } finally {
        setLoading(false);
      }
    };
    fetchApi();
  }, [page, limit, reload]);

  const onReload = () => {
    setReload((prev) => !prev);
  };
  const columns = [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
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
      title: "Hành động",
      dataIndex: "action",
      key: "action",
      render: (_: any, record: CategoryBrandTableItem) => (
        <>
          <Tooltip title="Remove">
            <Popconfirm
              title="Bạn có chắc chắn muốn xoá không?"
              okText="Xoá"
              cancelText="Hủy"
              onConfirm={() => handleRemove(record.key)}
            >
              <Button
                color="danger"
                variant="outlined"
                icon={<DeleteOutlined />}
              ></Button>
            </Popconfirm>
          </Tooltip>
        </>
      ),
    },
  ];
  const handleRemove = async (id: number) => {
    try {
      await deleteCategoryBrand(Number(id));
      message.success("Xóa thành công");
      onReload();
    } catch (err: any) {
      const axiosError = err as AxiosError;
      const errorMsg = axiosError?.message || "Có lỗi xảy ra";
      message.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const setCategoryBrandData = (data: CategoryBrand[]) => {
    setDataSource(
      data.map((item, index) => {
        return {
          key: item.id,
          stt: (page - 1) * limit + index + 1,
          category: item.category.name,
          brand: item.brand.name,
          action: item.id,
        };
      })
    );
  };
  return (
    <div>
      {message.contextHolder}
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
