import axios from "axios";
import { store } from "@/store";
import { url } from "@/constants";
import { authClient } from "./authClient";
import { setTokens, TokensType } from "@/features/auth";
import { getPrivateKey, signMessage } from "@/features/wallet";

export const apiClient = axios.create({
  baseURL: url,
  timeout: 10000,
});

let isRefreshing = false;

let requestQueue: Array<(token: string | null, err?: any) => void> = [];

const subscribeTokenRefresh = (cb: (token: string | null, err?: any) => void) => {
  requestQueue.push(cb);
};

const onRefreshed = (token: string | null, err?: any) => {
  requestQueue.forEach(cb => cb(token, err));
  requestQueue = [];
};

apiClient.interceptors.request.use(
  config => {
    const state = store.getState();
    const token = state.auth.accessToken;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error),
);

apiClient.interceptors.response.use(
  response => {
    const data = response.data;

    return data.success ? data.data : Promise.reject(data);
  },
  async error => {
    const { config, response } = error;
    const message = response?.data?.message;

    if (config._retry) {
      return Promise.reject(error);
    }

    if (message === "at_expire" || message === "rt_expire") {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          subscribeTokenRefresh((newToken, err) => {
            if (err) {
              return reject(err);
            }
            config._retry = true;
            config.headers.Authorization = `Bearer ${newToken}`;
            resolve(apiClient(config));
          });
        });
      }

      isRefreshing = true;

      try {
        const state = store.getState();
        const refreshToken = state.auth.refreshToken;
        let result: TokensType;

        if (message === "at_expire") {
          result = await authClient.post<any, TokensType>("/api/auth/refreshToken", {
            refreshToken,
          });
        } else {
          const address = state.auth.user.address;

          const authSlogan = await authClient.post<any, string>("/api/auth/getNonce", {
            address,
          });

          const privateKey = await getPrivateKey();
          const signature = await signMessage(privateKey, authSlogan);

          result = await authClient.post<any, TokensType>("/api/auth/tokenRotate", {
            refreshToken,
            address,
            signature,
          });
        }

        store.dispatch(setTokens(result));

        isRefreshing = false;
        onRefreshed(result.accessToken);

        config._retry = true;
        config.headers.Authorization = `Bearer ${result.accessToken}`;
        return apiClient(config);
      } catch (refreshError) {
        isRefreshing = false;
        onRefreshed(null, refreshError);

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);
