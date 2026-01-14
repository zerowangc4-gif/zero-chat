import { useCallback } from "react"; // 必须导入
import { Toast } from "@/components";
import { useGenerateWallet } from "@/features/wallet";
import { useApp, useInput } from "@/hooks";
import { ROUTES } from "@/navigation";

export function useSetupPassword() {
  const { theme, t, navigation } = useApp();
  const { generate, isGenerating, error: walletError } = useGenerateWallet();

  const password = useInput("");
  const confirmPassword = useInput("");

  const isPasswordValid = password.value.length >= 8;
  const isPasswordMatch = password.value === confirmPassword.value;
  const showPasswordMismatchError = confirmPassword.value.length > 0 && !isPasswordMatch;

  const isFormValid = isPasswordValid && isPasswordMatch && !isGenerating;

  const handleContinue = useCallback(async () => {
    if (!isFormValid || isGenerating) return;

    try {
      const mnemonic = await generate();

      if (mnemonic) {
        navigation.replace(ROUTES.BackupSecretQR, { mnemonic, password: password.value });
      } else {
        Toast.error(walletError || t("auth.create_account.errors_wallet_gen_failed"));
      }
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : t("common.error");
      Toast.error(message);
    }
  }, [isFormValid, isGenerating, generate, navigation, password.value, walletError, t]);

  return {
    theme,
    t,
    navigation,
    password,
    confirmPassword,
    showPasswordMismatchError,
    isFormValid,
    isGenerating,
    handleContinue,
  };
}
