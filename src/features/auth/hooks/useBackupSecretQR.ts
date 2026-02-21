import { useMemo, useRef } from "react";
import CryptoJS from "react-native-crypto-js";
import { Toast } from "@/components";
import ViewShot from "react-native-view-shot";
import QRCode from "react-native-qrcode-svg";
import { useApp, useAndroidPermission } from "@/hooks";
import { loginApp } from "@/features/auth";
import { getErrorMessage, getFormatEncryptedMnemonic } from "@/utils";

export function useBackupSecretQR() {
  const { t, theme, route, dispatch } = useApp();

  const { mnemonic, address, publicKey, username, password } = route.params || {};

  const { requestPermission } = useAndroidPermission();

  const words = useMemo(() => mnemonic.split(" ").filter(Boolean), [mnemonic]);

  const viewShotRef = useRef<ViewShot>(null);

  const encryptedMnemonic = useMemo(() => {
    if (!password) {
      return mnemonic;
    }

    const ciphertext = CryptoJS.AES.encrypt(mnemonic, password).toString();
    const formatEncryptedMnemonic = getFormatEncryptedMnemonic(ciphertext);
    return formatEncryptedMnemonic;
  }, [mnemonic, password]);

  async function handleBackup() {
    const isAllowed = await requestPermission();
    if (!isAllowed) return false;

    try {
      const uri = await viewShotRef.current?.capture?.();

      if (!uri || !address || !username || !publicKey) {
        const message = t("auth.error_generation_failed");
        throw new Error(message);
      }

      dispatch(loginApp({ address, username, publicKey, uri }));
    } catch (e: unknown) {
      const message = getErrorMessage(e);
      Toast.error(message);
    }
  }

  return {
    t,
    theme,
    words,
    encryptedMnemonic,
    ViewShot,
    QRCode,
    viewShotRef,
    handleBackup,
  };
}
