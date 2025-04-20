import { del, get, post, put } from "@/services/axios";
import { ProductRequest } from "@/types/request.type";
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

export const getProductById = async (id: Number): Promise<ProductResponse> => {
  const res = await get<ProductResponse>(`/products/${id}`);
  return res.data;
}

export const getProductBySlug = async (slug: string): Promise<ProductResponse> => {
  const res = await get<ProductResponse>(`/products/slug/${slug}`);
  return res.data;
}

export const searchProductByName = async (value: string) => {
  const query = `name:${value}`;
  const res = await getProduct(1, 5, undefined, undefined, undefined, query);
  return res.products;
};

export const getAllProducts = async (page: number, limit: number) => {
  const res = await get<Page<ProductResponse>>(`/products?page=${page}&limit=${limit}`);
  return res.data;
}

export const createProduct = async (productRequest: ProductRequest) => {
  const res = await post("/products", productRequest);
  return res.data;
}

export const deleteImageProduct = async (productId: Number, imageId: Number) => {
  const res = await del(`/products/delete-image/${productId}/${imageId}`);
  return res.data;
}

export const addImageProduct = async (productId: number, imageUrl: string) => {
  const res = await post(`/products/add-image/${productId}`, { imageUrl });
  return res.data;
};

export const updateProduct = async (id: number, productRequest: ProductRequest) => {
  const res = await put(`/products/${id}`, productRequest);
  return res.data;
}

export const getRandom10Products = async (slug: string): Promise<ProductResponse[]> => {
  const res = await get<ProductResponse[]>(`/products/random-products/${slug}`);
  return res.data;
}

export const increaseViewCount = async (slug: string) => {
  const res = await put(`/products/increase-view-count/${slug}`);
  return res.data;
}
