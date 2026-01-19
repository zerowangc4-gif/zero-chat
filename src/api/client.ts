import axios from "axios";
import { Alert } from "react-native";

export const apiClient = axios.create({
  baseURL: "https://zerochat.top", // 建议直接把版本号写在 BaseURL 里
  timeout: 10000,
});

apiClient.interceptors.response.use(
  response => {
    console.log("服务器原始返回:", response.data);
    return response.data;
  },
  error => {
    // 如果接口不通（比如 404, 500），这里会弹窗
    const errMsg = error.response?.data?.message || "连接服务器失败";
    Alert.alert("请求出错了", errMsg);
    return Promise.reject(error);
  },
);
