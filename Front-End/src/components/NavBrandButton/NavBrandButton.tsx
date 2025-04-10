import { Button } from "antd";
import { useLocation } from "react-router";

export const NavBrandButton = ({
  label,
  danger,
}: {
  label: string;
  danger?: boolean;
}) => {
  const location = useLocation();
  const pathname = location.pathname;

  const parts = pathname.split("/");
  const brand = parts[parts.length - 1].replace(".html", "");

  return (
    <Button
      className="capitalize"
      ghost={brand === label}
      type={brand === label ? "primary" : "default"}
      danger={danger}
    >
      {label}
    </Button>
  );
};
