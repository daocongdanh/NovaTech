import { Pagination } from "antd";
import { useLocation, useNavigate } from "react-router";

type TProps = {
  current?: number;
  pageSize?: number;
  total: number;
};

export default function MyPagination({
  current = 1,
  pageSize = 10,
  total,
}: TProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const onChange = (page: number, newPageSize: number) => {
    const params = new URLSearchParams(location.search);
    params.set("page", page.toString());
    params.set("limit", newPageSize.toString());
    navigate(`${location.pathname}?${params.toString()}`, { replace: true });
  };

  return (
    <div className="flex justify-center">
      <Pagination
        onChange={onChange}
        pageSize={pageSize}
        current={current}
        total={total}
      />
    </div>
  );
}
