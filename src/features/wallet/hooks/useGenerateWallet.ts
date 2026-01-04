import { useState, useCallback } from "react";
import { walletService } from "../services/walletService";
import { useTranslation } from "react-i18next";

export const useGenerateWallet = () => {
  const { t } = useTranslation();
  const [isGenerating, setIsGenerating] = useState(false);

  const [error, setError] = useState<string | null>(null);

  const generate = useCallback(async () => {
    // 如果已经在生成中，直接返回，防止重复点击触发多个 Promise
    if (isGenerating) return null;

    setIsGenerating(true);
    setError(null);

    try {
      const mnemonic = await Promise.resolve().then(() => walletService.createRandomMnemonic());

      if (!mnemonic) {
        throw new Error("EMPTY_MNEMONIC");
      }

      return mnemonic;
    } catch (e) {
      // 精细化错误拦截
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
