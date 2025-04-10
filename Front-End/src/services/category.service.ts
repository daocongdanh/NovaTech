import { get } from "@/services/axios";
import { CategoryResponse } from "@/types/response.type";

export const getAllCategory = async (): Promise<CategoryResponse[]> => {
  const res = await get<CategoryResponse[]>("/categories");
  const categories = res.data;
  return categories;
};