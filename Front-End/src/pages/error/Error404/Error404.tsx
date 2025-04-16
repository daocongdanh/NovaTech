import { Button, Result } from "antd";
import { useNavigate } from "react-router";

export default function Error404() {
  const navigate = useNavigate();
  return (
    <Result
      status="404"
      title="404"
      subTitle="Xin lỗi, trang bạn tìm kiếm không tồn tại."
      extra={
        <Button
          ghost={true}
          type={"primary"}
          danger={true}
          size="large"
          onClick={() => navigate("/")}
        >
          Quay lại
        </Button>
      }
    />
  );
}
