import { getAllCategory } from "@/services/category.service";
import { CategoryResponse } from "@/types/response.type";
import { useEffect, useState } from "react";
import { EditOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Input, Spin, Table, Tag, Tooltip } from "antd";
import { Link } from "react-router";
const { Search } = Input;

interface CategoryTableItem {
  key: number;
  stt: number;
  name: string;
  image: string;
  slug: string;
  active: boolean;
  action: number;
}
export default function CategoryManagement() {
  const [dataSource, setDataSource] = useState<CategoryTableItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    const fetchApi = async () => {
      setLoading(true);
      try {
        const res = await getAllCategory();
        setCategoryData(res);
      } finally {
        setLoading(false);
      }
    };
    fetchApi();
  }, []);

  const setCategoryData = (data: CategoryResponse[]) => {
    setDataSource(
      data.map((item, index) => {
        return {
          key: item.id,
          stt: index + 1,
          name: item.name,
          image: item.image,
          slug: item.slug,
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
      title: "Tên danh mục",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Hình ảnh",
      dataIndex: "image",
      key: "image",
      render: (image: string) => (
        <img src={image} alt="icon" width={40} height={40} />
      ),
    },
    {
      title: "Đường dẫn",
      dataIndex: "slug",
      key: "slug",
    },
    {
      title: "Trạng thái",
      dataIndex: "active",
      key: "active",
      render: (active: Boolean) => (
        <Tag
          className="text-[14px] font-[500]"
          color={active === true ? "green" : "red"}
        >
          {active === true ? "Đang hoạt động" : "Ngưng hoạt động"}
        </Tag>
      ),
    },
    {
      title: "Hành động",
      dataIndex: "action",
      key: "action",
      render: (_: any, record: CategoryTableItem) => (
        <>
          <Tooltip title="Cập nhật" className="mr-[10px]">
            <Link to={`update/${record.key}`}>
              <Button type="primary" ghost icon={<EditOutlined />}></Button>
            </Link>
          </Tooltip>
        </>
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
          />
        </>
      )}
    </div>
  );
}
