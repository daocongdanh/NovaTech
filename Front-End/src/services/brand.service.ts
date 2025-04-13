import { del, get, post, put } from "@/services/axios";
import { BrandRequest } from "@/types/request.type";
import { BrandResponse, Page } from "@/types/response.type";


export const getbrandsByCategory = async (
  category: string
): Promise<BrandResponse[]> => {
  const res = await get<BrandResponse[]>(`/brands/category/${category}`);
  const brands = res.data;
  return brands;
};

export const getBrandById = async (id: number): Promise<BrandResponse> => {
  const res = await get<BrandResponse>(`/brands/${id}`);
  return res.data;
}

export const getAllBrands = async (page: number = 1, limit: number = 10): Promise<Page<BrandResponse>> => {
  const res = await get<Page<BrandResponse>>(`/brands?page=${page}&limit=${limit}`);
  const brands = res.data;
  return brands;
};

export const createBrand = async (brandRequest: BrandRequest) => {
  const res = await post("/brands", brandRequest);
  return res.data;
}

export const updateBrand = async (id: number, brandRequest: BrandRequest) => {
  const res = await put(`/brands/${id}`, brandRequest);
  return res.data;
}

export const deleteBrand = async (id: number) => {
  const res = await del(`/brands/${id}`);
  return res.data;
}