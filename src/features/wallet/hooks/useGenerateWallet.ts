import { useState, useCallback } from "react";
import { walletService } from "../services/walletService";
import { useTranslation } from "react-i18next";

export const useGenerateWallet = () => {
  const { t } = useTranslation();
  const [isGenerating, setIsGenerating] = useState(false);

  const [error, setError] = useState<string | null>(null);

  const generate = useCallback(async () => {
    if (isGenerating) return null;

    setIsGenerating(true);
    setError(null);
    await new Promise(resolve => setTimeout(resolve, 0));
    try {
      const mnemonic = walletService.createRandomMnemonic();

      if (!mnemonic) {
        throw new Error("EMPTY_MNEMONIC");
      }
      const walletInfo = walletService.deriveWalletFromMnemonic(mnemonic);

      return {
        mnemonic,
        address: walletInfo.address,
        publicKey: walletInfo.publicKey,
        privateKey: walletInfo.privateKey,
      };
    } catch (e) {
      let errorMessage = t("auth.create_account.errors_wallet_gen_failed");

      if (e instanceof Error && e.message === "EMPTY_MNEMONIC") {
        errorMessage = t("auth.create_account.errors_mnemonic_empty");
      }

      setError(errorMessage);
      return null;
    } finally {
      setIsGenerating(false);
    }
  }, [t, isGenerating]);

  return { generate, isGenerating, error };
};
