import * as Keychain from "react-native-keychain";

const KEYCHAIN_SERVICE = "com.yourapp.wallet.auth";

export const walletStorage = {
  /** 加密存储私钥和地址 */
  saveWallet: async (privateKey: string, address: string): Promise<boolean> => {
    try {
      await Keychain.setGenericPassword(address, privateKey, {
        service: KEYCHAIN_SERVICE,
      });
      return true;
    } catch (error) {
      console.error("Storage failed", error);
      return false;
    }
  },

  /** 读取钱包数据 */
  loadWallet: async () => {
    try {
      const creds = await Keychain.getGenericPassword({ service: KEYCHAIN_SERVICE });
      return creds ? { address: creds.username, privateKey: creds.password } : null;
    } catch (error) {
      console.error("Storage failed", error);
      return null;
    }
  },

  /** 清空钱包 */
  clearWallet: async () => {
    await Keychain.resetGenericPassword({ service: KEYCHAIN_SERVICE });
  },
};
