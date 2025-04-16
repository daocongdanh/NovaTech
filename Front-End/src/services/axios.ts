import { TResponse } from "@/types/response.type";
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

const BASEURL = "http://localhost:8080/api/v1";
let navigate: any = null;

export const setNavigate = (nav: any) => {
  navigate = nav;
};

const axiosInstance: AxiosInstance = axios.create({
  baseURL: BASEURL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error) => {
    const messageError = error?.response?.data?.message;
    const statusError = error?.response?.data?.status;

    if (statusError === 404) {
      if (navigate) {
        navigate('/not-found');
      }
    }
    if (messageError && statusError) {
      const err = new Error(messageError);
      return Promise.reject(err);
    }
    return Promise.reject(error);
  }
);

const get = async <T>(
  url: string,
  config?: AxiosRequestConfig
): Promise<TResponse & { data: T }> => {
  const response = await axiosInstance.get<TResponse & { data: T }>(
    url,
    config
  );
  return response.data;
};

const post = async <T>(
  url: string,
  data?: any,
  config?: AxiosRequestConfig
): Promise<TResponse & { data: T }> => {
  const response = await axiosInstance.post<TResponse & { data: T }>(
    url,
    data,
    config
  );
  return response.data;
};

const put = async <T>(
  url: string,
  data?: any,
  config?: AxiosRequestConfig
): Promise<TResponse & { data: T }> => {
  const response = await axiosInstance.put<TResponse & { data: T }>(
    url,
    data,
    config
  );
  return response.data;
};

const patch = async <T>(
  url: string,
  data?: any,
  config?: AxiosRequestConfig
): Promise<TResponse & { data: T }> => {
  const response = await axiosInstance.patch<TResponse & { data: T }>(
    url,
    data,
    config
  );
  return response.data;
};

const del = async <T>(
  url: string,
  config?: AxiosRequestConfig
): Promise<TResponse & { data: T }> => {
  const response = await axiosInstance.delete<TResponse & { data: T }>(
    url,
    config
  );
  return response.data;
};

export { axiosInstance, get, post, patch, put, del };