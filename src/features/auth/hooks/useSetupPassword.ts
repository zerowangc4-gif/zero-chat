import { useCallback, useState } from "react";
import { Toast } from "@/components";
import { createWallet } from "@/features/wallet";
import { useApp, useInput } from "@/hooks";
import { ROUTES } from "@/navigation";

export function useSetupPassword() {
  const [isGenerating, setIsGenerating] = useState(false);
  const { theme, t, navigation } = useApp();

  const password = useInput("");

  const confirmPassword = useInput("");

  const isPasswordValid = password.value.length >= 8;

  const isPasswordMatch = password.value === confirmPassword.value;

  const showPasswordTagline = !isPasswordValid && !!password.value;

  const showPasswordMismatchError = confirmPassword.value.length > 0 && !isPasswordMatch;

  const isFormValid = isPasswordValid && isPasswordMatch && !isGenerating;

  const buttonText = isGenerating ? t("common.loading") : t("auth.action_generate_and_backup");

  const handleContinue = useCallback(async () => {
    if (!isFormValid) return;

    try {
      setIsGenerating(true);

      const mnemonic = await createWallet();

      navigation.replace(ROUTES.BackupSecretQR, {
        mnemonic,
        password: password.value,
      });
    } catch (e: unknown) {
      console.error(e);
      Toast.error(t("error_generation_failed"));
    } finally {
      setIsGenerating(false);
    }
  }, [isFormValid, navigation, password.value, t]);

  return {
    theme,
    t,
    navigation,
    showPasswordTagline,
    password,
    confirmPassword,
    showPasswordMismatchError,
    isFormValid,
    buttonText,
    isGenerating,
    handleContinue,
  };
}
