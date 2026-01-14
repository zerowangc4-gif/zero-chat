import { useMemo, useRef } from "react";
import { CameraRoll } from "@react-native-camera-roll/camera-roll";
import CryptoJS from "react-native-crypto-js";
import { Toast } from "@/components";
import ViewShot from "react-native-view-shot";
import QRCode from "react-native-qrcode-svg";
import { useApp, useAndroidPermission } from "@/hooks";

export function useBackupSecretQR() {
  const { t, theme, route } = useApp();
  const mnemonic = route.params?.mnemonic || "";
  const { requestPermission } = useAndroidPermission();

  const words = useMemo(() => mnemonic.split(" ").filter(Boolean), [mnemonic]);

  const viewShotRef = useRef<ViewShot>(null);

  const encryptedMnemonic = useMemo(() => {
    const password = route.params?.password || "";

    if (!password) return mnemonic;

    const ciphertext = CryptoJS.AES.encrypt(mnemonic, password).toString();

    return `ZT_V1:${ciphertext}`;
  }, [mnemonic, route.params?.password]);

  const handleBackup = async () => {
    const isAllowed = await requestPermission();
    if (!isAllowed) return false;

    try {
      const uri = await viewShotRef.current?.capture?.();

      if (uri) {
        await CameraRoll.saveAsset(uri, { type: "photo", album: "ZeroTrace" });
        return true;
      }
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : t("auth.create_account.seed.backup_failed");
      Toast.error(message);
    }

    return false;
  };

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
