import { get, post, put } from "@/services/axios";
import { ArticleRequest } from "@/types/request.type";
import { Article, Page } from "@/types/response.type";

export const getAllArticles = async (page: number, limit: number, active?: boolean): Promise<Page<Article>> => {
  const res = await get<Page<Article>>(`/articles`, {
    params: active !== undefined ? { page, limit, active } : { page, limit }
  }
  );
  return res.data;
}

export const createArticle = async (articleRequest: ArticleRequest) => {
  const res = await post("/articles", articleRequest);
  return res.data;
}

export const updateArticle = async (id: number, articleRequest: ArticleRequest) => {
  const res = await put(`/articles/${id}`, articleRequest);
  return res.data;
}

export const getArticleById = async (id: number): Promise<Article> => {
  const res = await get<Article>(`/articles/${id}`);
  return res.data;
}

export const getArticleBySlug = async (slug: string): Promise<Article> => {
  const res = await get<Article>(`/articles/slug/${slug}`);
  return res.data;
}