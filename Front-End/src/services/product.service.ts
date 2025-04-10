import { get } from "@/services/axios";
import { AttributeResponse, Page, ProductResponse } from "@/types/response.type";

export const getProduct = async (
  page: number = 1,
  limit: number = 10,
  category?: string,
  brand?: string,
  sort?: string,
  search?: string,
  active: boolean = true
) => {
  let query = `page=${page}&limit=${limit}`;
  if (category) query += `&category=${category}`;
  if (brand) query += `&brand=${brand}`;
  if (sort) query += `&sort=${sort}`;
  if (search) query += `&search=${search}`;
  query += `&active=${active}`;
  const res = await get<Page<ProductResponse>>(`/products/search-product?${query}`);
  const products = res.data.result;
  const totalItem = res.data.totalItem;
  return { products, totalItem };
};

export const getTop10ProductsByCategory = async ({ categoryId }: { categoryId: number }): Promise<ProductResponse[]> => {
  const res = await get<ProductResponse[]>(`/products/top-10-products-by-category/${categoryId}`);
  return res.data;
}

export const getAttributesByCategory = async (
  category?: string,
  brand?: string
): Promise<AttributeResponse[]> => {
  let query = "/attributes?";
  if (category) query += `category=${category}`;
  if (brand) query += `&brand=${brand}`;
  try {
    const res = await get<AttributeResponse[]>(query);
    const attributes = res.data;
    return attributes;
  } catch {
    return [];
  }
};