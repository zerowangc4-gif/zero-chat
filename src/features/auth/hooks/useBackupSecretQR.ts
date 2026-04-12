import { useMemo, useRef } from "react";
import CryptoJS from "react-native-crypto-js";
import { Toast } from "@/components";
import ViewShot from "react-native-view-shot";
import { Linking, Alert } from "react-native";
import QRCode from "react-native-qrcode-svg";
import { useApp, useAndroidPermission } from "@/hooks";
import { RegisterAndLogin } from "@/features/auth";
import { getFormatEncryptedMnemonic } from "@/utils";

export function useBackupSecretQR() {
  const { t, theme, route, dispatch } = useApp();

  const { mnemonic, password } = route.params || {};

  const { requestPermission } = useAndroidPermission();

  const words = useMemo(() => mnemonic.split(" ").filter(Boolean), [mnemonic]);

  const viewShotRef = useRef<ViewShot>(null);

  // 加密后的助记词
  const encryptedMnemonic = useMemo(() => {
    if (!password || !mnemonic) return mnemonic;

    const ciphertext = CryptoJS.AES.encrypt(mnemonic, password).toString();

    return getFormatEncryptedMnemonic(ciphertext);
  }, [mnemonic, password]);

  async function handleBackup() {
    const isAllowed = await requestPermission();

    if (!isAllowed) {
      Toast.error(t("auth.permission_denied_error"));
      Alert.alert(t("auth.permission_title"), t("auth.permission_denied_error"), [
        {
          text: t("common.cancel"),
          style: "cancel",
        },
        {
          text: t("common.go_to_settings"), // 按钮文案：去设置
          onPress: () => Linking.openSettings(), // 核心：跳转到当前 App 的系统设置页
        },
      ]);
      return;
    }

    try {
      const url = await viewShotRef.current?.capture?.();

      if (!url) {
        throw new Error(t("auth.error_generation_failed"));
      }

      dispatch(RegisterAndLogin(url));
    } catch (e: unknown) {
      console.error(e);
      Toast.error(t("auth.error_generation_failed"));
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
