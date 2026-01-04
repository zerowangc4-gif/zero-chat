import { Wallet, HDNodeWallet, Mnemonic, TransactionRequest } from "ethers";

export const walletService = {
  /** 生成随机助记词 */
  createRandomMnemonic: (): string => {
    const wallet = Wallet.createRandom();
    return wallet.mnemonic!.phrase;
  },

  /** 派生钱包账户 */
  deriveWalletFromMnemonic: (mnemonic: string) => {
    const hdNode = HDNodeWallet.fromPhrase(mnemonic);
    return {
      address: hdNode.address,
      privateKey: hdNode.privateKey,
    };
  },

  /** 校验助记词合法性 */
  validateMnemonic: (mnemonic: string): boolean => {
    return Mnemonic.isValidMnemonic(mnemonic);
  },

  /** 离线签名交易 */
  signTransaction: async (privateKey: string, txRequest: TransactionRequest): Promise<string> => {
    const wallet = new Wallet(privateKey);
    return await wallet.signTransaction(txRequest);
  },
};
