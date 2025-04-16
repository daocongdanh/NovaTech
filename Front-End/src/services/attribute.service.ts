import { del, get, post, put } from "@/services/axios";
import { AttributeRequest } from "@/types/request.type";
import { Attribute, Page } from "@/types/response.type";

export const getAttributeByCategory = async (slug: string): Promise<Attribute[]> => {
  const res = await get<Attribute[]>(`/attributes/category/${slug}`);
  return res.data;
}

export const createAttribute = async (attributeRequest: AttributeRequest) => {
  const res = await post("/attributes", attributeRequest);
  return res.data;
}

export const updateAttribute = async (id: number, attributeRequest: AttributeRequest) => {
  const res = await put(`/attributes/${id}`, attributeRequest);
  return res.data;
}

export const deleteAttribute = async (id: number) => {
  const res = await del(`/attributes/${id}`);
  return res.data;
}

export const getAllAttributesWithPagination = async (page: number, limit: number): Promise<Page<Attribute>> => {
  const res = await get<Page<Attribute>>(`/attributes/pagination?page=${page}&limit=${limit}`);
  return res.data;
}

export const getAttributeById = async (id: number): Promise<Attribute> => {
  const res = await get<Attribute>(`/attributes/${id}`);
  return res.data;
}