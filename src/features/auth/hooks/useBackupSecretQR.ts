import { useMemo, useRef } from "react";
import CryptoJS from "react-native-crypto-js";
import { Toast } from "@/components";
import ViewShot from "react-native-view-shot";
import QRCode from "react-native-qrcode-svg";
import { useApp, useAndroidPermission } from "@/hooks";
import { loginApp } from "../store";

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

    return `ZT_V1:${ciphertext}`;
  }, [mnemonic, password]);

  async function handleBackup() {
    const isAllowed = await requestPermission();
    if (!isAllowed) return false;

    try {
      const uri = await viewShotRef.current?.capture?.();

      if (!uri || !address || !username || !publicKey) {
        const message = t("auth.errors_wallet_gen_failed");
        Toast.error(message);
        return;
      }

      dispatch(loginApp({ address, username, publicKey, uri }));
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : t("auth.backup_failed");
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
