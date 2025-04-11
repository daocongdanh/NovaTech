import { post } from "@/services/axios";

export const upload = async (formData: FormData): Promise<string[]> => {
  const res = await post<string[]>("/uploads", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
}