import { store } from "@/store";
import { authClient } from "./authClient";
import { setTokens, TokensType } from "@/features/auth";
import { getPrivateKey, signMessage } from "@/features/wallet";
import { AT_EXPIRE, RT_EXPIRE } from "@/constants";
import { getErrorMessage } from "@/utils";

type TokenExpireType = "at_expire" | "rt_expire";

interface TokenRotateParams {
  refreshToken: string;
  address: string;
  signature: string;
}

async function getNonce(address: string): Promise<string> {
  const result: string = await authClient.post("/api/auth/getNonce", {
    address,
  });
  return result;
}

async function getTokens(params: TokenRotateParams): Promise<TokensType> {
  const result: TokensType = await authClient.post("/api/auth/tokenRotate", params);
  return result;
}
async function getToken(refreshToken: string): Promise<TokensType> {
  const result: TokensType = await authClient.post("/api/auth/refreshToken", { refreshToken });
  return result;
}

class AuthService {
  private refreshPromise: Promise<string> | null = null;

  /**
   * 统一获取/刷新 Token 的入口
   * 无论是 Axios 拦截器还是 Socket 逻辑，都调用这个方法
   */
  async refreshToken(type: TokenExpireType): Promise<string> {
    if (this.refreshPromise) {
      return this.refreshPromise;
    }

    this.refreshPromise = this.executeRefresh(type).finally(() => {
      this.refreshPromise = null;
    });

    return this.refreshPromise;
  }

  private async executeRefresh(type: TokenExpireType): Promise<string> {
    const state = store.getState();
    const refreshToken = state.auth.refreshToken;
    const address = state.auth.user?.address;

    let result: TokensType;

    try {
      if (type === AT_EXPIRE) {
        result = await getToken(refreshToken);
      } else {
        const authSlogan = await getNonce(address);
        const privateKey = await getPrivateKey();
        const signature = await signMessage(privateKey, authSlogan);

        result = await getTokens({
          refreshToken,
          address,
          signature,
        });
      }

      store.dispatch(setTokens(result));
      return result.accessToken;
    } catch (error: unknown) {
      const message = getErrorMessage(error);

      if (message === AT_EXPIRE || message === RT_EXPIRE) {
        return this.executeRefresh(message);
      }

      throw error;
    }
  }
}

export const authService = new AuthService();
