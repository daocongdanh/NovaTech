import { del, get, post, put } from "@/services/axios";
import { CategoryAttributeRequest, CategoryBrandRequest, CategoryRequest } from "@/types/request.type";
import { CategoryAttribute, CategoryBrand, CategoryResponse, Page } from "@/types/response.type";

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

export const getAllCategoryAttributes = async (page: number, limit: number): Promise<Page<CategoryAttribute>> => {
  const res = await get<Page<CategoryAttribute>>(`/category-attributes?page=${page}&limit=${limit}`);
  return res.data;
}

export const createCategoryAttribute = async (categoryAttributeRequest: CategoryAttributeRequest) => {
  const res = await post("/category-attributes", categoryAttributeRequest);
  return res.data;
}

export const deleteCategoryAttribute = async (id: number) => {
  const res = await del(`/category-attributes/${id}`);
  return res.data;
}

export const getAllCategoryBrands = async (page: number, limit: number): Promise<Page<CategoryBrand>> => {
  const res = await get<Page<CategoryBrand>>(`/category-brands?page=${page}&limit=${limit}`);
  return res.data;
}

export const createCategoryBrand = async (categoryBrandRequest: CategoryBrandRequest) => {
  const res = await post("/category-brands", categoryBrandRequest);
  return res.data;
}

export const deleteCategoryBrand = async (id: number) => {
  const res = await del(`/category-brands/${id}`);
  return res.data;
}
