import { useState, useCallback } from "react";
import { walletService, savePrivateKey } from "../services";

import { getErrorMessage } from "@/utils";
export interface WalletType {
  mnemonic: string;
  address: string;
  publicKey: string;
  privateKey: string;
}
export const useGenerateWallet = () => {
  const [isGenerating, setIsGenerating] = useState(false);

  const generate = useCallback(async () => {
    if (isGenerating) return null;

    setIsGenerating(true);

    await new Promise(resolve => setTimeout(resolve, 0));
    try {
      const mnemonic = walletService.createRandomMnemonic();

      if (!mnemonic) {
        throw new Error("EMPTY_MNEMONIC");
      }
      const walletInfo = walletService.deriveWalletFromMnemonic(mnemonic);
      await savePrivateKey(walletInfo.address, walletInfo.privateKey);

      return {
        mnemonic,
        address: walletInfo.address,
        publicKey: walletInfo.publicKey,
        privateKey: walletInfo.privateKey,
      };
    } catch (e: unknown) {
      const message = getErrorMessage(e);
      throw new Error(message);
    } finally {
      setIsGenerating(false);
    }
  }, [isGenerating]);

  return { generate, isGenerating };
};
