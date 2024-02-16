import axios, { AxiosRequestConfig } from 'axios';

import { HOST_API } from '../config-global';

// ----------------------------------------------------------------------

const axiosInstance = axios.create({ baseURL: HOST_API });

axiosInstance.interceptors.response.use(
  (res) => res,
  (error) =>
    Promise.reject(
      (error.response && error.response.data) || 'Something went wrong',
    ),
);

export default axiosInstance;

// ----------------------------------------------------------------------

export const fetcher = async (args: string | [string, AxiosRequestConfig]) => {
  const [url, config] = Array.isArray(args) ? args : [args];

  const res = await axiosInstance.get(url, { ...config });

  return res.data;
};

export const onPost = async (
  url: string,
  { data, ...options }: AxiosRequestConfig,
) => {
  const res = await axiosInstance.post(url, data, options);

  return res.data;
};

export const onPatch = async (
  url: string,
  { data, ...options }: AxiosRequestConfig,
) => {
  const res = await axiosInstance.patch(url, data, options);

  return res.data;
};

export const onDelete = async (url: string, options?: AxiosRequestConfig) => {
  const res = await axiosInstance.delete(url, options);

  return res.data;
};
