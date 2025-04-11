import { get, post, put } from "@/services/axios";
import { CategoryRequest } from "@/types/request.type";
import { CategoryResponse } from "@/types/response.type";

export const getAllCategory = async (active?: boolean): Promise<CategoryResponse[]> => {
  const res = await get<CategoryResponse[]>("/categories", {
    params: active !== undefined ? { active } : {},
  });
  return res.data;
};

export const createCategory = async (categoryRequest: CategoryRequest): Promise<CategoryResponse> => {
  const res = await post<CategoryResponse>("/categories", categoryRequest);
  return res.data;
}

export const getCategoryById = async (id: number): Promise<CategoryResponse> => {
  const res = await get<CategoryResponse>(`/categories/${id}`);
  return res.data;
}

export const updateCategory = async (id: number, categoryRequest: CategoryRequest): Promise<CategoryResponse> => {
  const res = await put<CategoryResponse>(`/categories/${id}`, categoryRequest);
  return res.data;
}