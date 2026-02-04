import axios from "axios";
import { url } from "@/constants";
export const authClient = axios.create({
  baseURL: url,
  timeout: 10000,
});

authClient.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);

authClient.interceptors.response.use(
  function (response) {
    const data = response.data;
    if (data.success) {
      return data.data;
    } else {
      return Promise.reject(data);
    }
  },
  function (error) {
    return Promise.reject(error);
  },
);
