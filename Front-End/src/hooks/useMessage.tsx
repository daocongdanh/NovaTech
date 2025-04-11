import { message } from "antd";
import { ReactNode, useCallback } from "react";

type MessageType = "success" | "error" | "warning" | "info" | "loading";
const useMessage = () => {
  const [messageApi, contextHolder] = message.useMessage();

  const showMessage = useCallback(
    (type: MessageType, content: ReactNode) => {
      messageApi.open({
        type,
        content,
      });
    },
    [messageApi]
  );

  const success = (content: ReactNode) => showMessage("success", content);
  const error = (content: ReactNode) => showMessage("error", content);
  const warning = (content: ReactNode) => showMessage("warning", content);

  return { success, error, warning, contextHolder };
};

export default useMessage;
