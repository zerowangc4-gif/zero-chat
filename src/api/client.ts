import axios from "axios";
import { store } from "@/store";
import { url, AT_EXPIRE, RT_EXPIRE } from "@/constants";
import { authService } from "./authService";

export const apiClient = axios.create({
  baseURL: url,
  timeout: 10000,
});

apiClient.interceptors.request.use(
  config => {
    const state = store.getState();
    const token = state.auth.accessToken;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    const { response } = error;
    const message = error.message || response.data.message;
    return Promise.reject(new Error(message));
  },
);

apiClient.interceptors.response.use(
  function (response) {
    const { data } = response;
    if (data.success) {
      return data.data;
    } else {
      return Promise.reject(new Error(data.message));
    }
  },
  async function (error) {
    const { config, response } = error;
    const message = response?.data?.message;
    if (message) {
      error.message = message;
    }
    if ((message === AT_EXPIRE || message === RT_EXPIRE) && !config._retry) {
      config._retry = true;

      try {
        const newToken = await authService.refreshToken(message);

        config.headers.Authorization = `Bearer ${newToken}`;
        return apiClient(config);
      } catch (refreshErr) {
        return Promise.reject(refreshErr);
      }
    }
    return Promise.reject(error);
  },
);
