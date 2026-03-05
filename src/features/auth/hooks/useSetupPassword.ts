import { useCallback } from "react"; // 必须导入
import { Toast } from "@/components";
import { useGenerateWallet, WalletType } from "@/features/wallet";
import { useApp, useInput } from "@/hooks";
import { ROUTES } from "@/navigation";
import { getErrorMessage } from "@/utils";
export function useSetupPassword() {
  const { theme, t, navigation } = useApp();
  const { generate, isGenerating } = useGenerateWallet();

  const password = useInput("");
  const confirmPassword = useInput("");

  const isPasswordValid = password.value.length >= 8;
  const showPasswordTagline = !isPasswordValid && !!password.value;
  const isPasswordMatch = password.value === confirmPassword.value;
  const showPasswordMismatchError = confirmPassword.value.length > 0 && !isPasswordMatch;

  const isFormValid = isPasswordValid && isPasswordMatch && !isGenerating;

  function isWalletComplete(wallet: WalletType | undefined | null): wallet is WalletType {
    return !!(wallet && wallet.mnemonic && wallet.address && wallet.privateKey && wallet.publicKey);
  }

  const handleContinue = useCallback(async () => {
    if (!isFormValid || isGenerating) return;

    try {
      const wallet = await generate();
      const isWallet = isWalletComplete(wallet);

      if (!isWallet) {
        const message = t("auth.error_generation_failed");
        Toast.error(message);
        return;
      }

      navigation.replace(ROUTES.BackupSecretQR, {
        mnemonic: wallet.mnemonic,
        address: wallet.address,
        publicKey: wallet.publicKey,
        username: `User_${wallet.address.slice(-4).toUpperCase()}`,
        password: password.value,
      });
    } catch (e: unknown) {
      const message = getErrorMessage(e);
      Toast.error(message);
    }
  }, [isFormValid, isGenerating, generate, t, navigation, password.value]);

  return {
    theme,
    t,
    navigation,
    showPasswordTagline,
    password,
    confirmPassword,
    showPasswordMismatchError,
    isFormValid,
    isGenerating,
    handleContinue,
  };
}
