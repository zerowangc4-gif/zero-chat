import { store } from "@/store";
import axios from "axios";

export const apiClient = axios.create({
  baseURL: "https://zerochat.top",
  timeout: 10000,
});

apiClient.interceptors.request.use(
  function (config) {
    const state = store.getState();
    const token = state.auth.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);

apiClient.interceptors.response.use(
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
