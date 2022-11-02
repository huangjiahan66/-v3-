import axios, { AxiosError } from "axios";
import type { AxiosInstance, AxiosResponse, AxiosRequestConfig } from "axios";
import type { ErrorResponse } from "./types";
import { MessagePlugin } from "tdesign-vue-next";
import { useAppStore } from "@/store";

const BASE_URL: string = import.meta.env.VITE_API_BASE_URL;
const instance: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 6000,
});

const tokenPrefix = "Bearer ";

/**
 * 请求拦截器
 */
instance.interceptors.request.use((request: AxiosRequestConfig) => {
  const appStore = useAppStore();
  if (appStore.token && request.headers) {
    request.headers["Authorization"] = tokenPrefix + appStore.token;
  }
  return request;
});

/**
 * 响应拦截器
 */
instance.interceptors.response.use(
  (response: AxiosResponse) => {
    return response.data;
  },
  async (error: AxiosError<ErrorResponse>) => {
    const responseData: ErrorResponse | undefined = error.response?.data;
    responseData && (await MessagePlugin.error(responseData.message));

    if (error.response?.status === 401) {
      const appStore = useAppStore();
      await appStore.logout(); //退出操作
    }

    return Promise.reject(error);
  }
);

export default instance;
