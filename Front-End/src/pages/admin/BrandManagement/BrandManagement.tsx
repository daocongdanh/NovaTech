import { deleteBrand, getAllBrands } from "@/services/brand.service";
import { BrandResponse } from "@/types/response.type";
import { Button, Spin, Table, Tooltip, Input, Popconfirm } from "antd";
import { useEffect, useState } from "react";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { Link, useSearchParams } from "react-router";
import MyPagination from "@/components/MyPagination/MyPagination";
import useMessage from "@/hooks/useMessage";
import { AxiosError } from "axios";
const { Search } = Input;
interface BrandTableItem {
  key: number;
  stt: number;
  name: string;
  action: number;
}
export default function BrandManagement() {
  const [dataSource, setDataSource] = useState<BrandTableItem[]>([]);
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
        const res = await getAllBrands(page, limit);
        setTotalItem(res.totalItem);
        setBrandData(res.result);
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
      title: "Tên thương hiệu",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Hành động",
      dataIndex: "action",
      key: "action",
      render: (_: any, record: BrandTableItem) => (
        <>
          <Tooltip title="Cập nhật" className="mr-[10px]">
            <Link to={`update/${record.key}`}>
              <Button type="primary" ghost icon={<EditOutlined />}></Button>
            </Link>
          </Tooltip>
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
      await deleteBrand(id);
      message.success("Xóa thương hiệu thành công");
      onReload();
    } catch (err: any) {
      const axiosError = err as AxiosError;
      const errorMsg = axiosError?.message || "Có lỗi xảy ra";
      message.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const setBrandData = (data: BrandResponse[]) => {
    setDataSource(
      data.map((item, index) => {
        return {
          key: item.id,
          stt: (page - 1) * limit + index + 1,
          name: item.name,
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
