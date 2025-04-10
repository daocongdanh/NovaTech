import { get } from "@/services/axios";
import { BrandResponse } from "@/types/response.type";


export const getbrandsByCategory = async (
  category: string
): Promise<BrandResponse[]> => {
  const res = await get<BrandResponse[]>(`/brands/category/${category}`);
  const brands = res.data;
  return brands;
};

export const getAllBrands = async (): Promise<BrandResponse[]> => {
  const res = await get<BrandResponse[]>(`/brands`);
  const brands = res.data;
  return brands;
};