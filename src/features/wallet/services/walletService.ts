import { Wallet } from "ethers";

export const walletService = {
  /**
   * 生成全新的随机助记词
   * 使用 ethers 内部集成的安全随机数生成器
   */
  createRandomMnemonic: (): string | undefined => {
    try {
      const wallet = Wallet.createRandom();
      return wallet.mnemonic?.phrase;
    } catch (error) {
      console.error("Critical: Failed to generate mnemonic", error);
      throw error;
    }
  },

  /**
   * 预留：未来这里会写导出私钥、地址等逻辑
   */
};
