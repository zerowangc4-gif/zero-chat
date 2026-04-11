import { t } from "i18next";
import { useState } from "react";
import CryptoJS from "react-native-crypto-js";
import { Mnemonic } from "ethers";
import { useApp, useInput } from "@/hooks";
import { createWallet } from "@/features/wallet";
import { RegisterAndLogin } from "../store";

import { Toast } from "@/components";
export function useUnlockIdentity() {
  const { theme, navigation, dispatch, route } = useApp();

  const [isUnlocking, setIsUnlocking] = useState(false);

  const password = useInput("");

  const handleGoback = () => {
    navigation.goBack();
  };

  //解密助记词
  const handleUnlock = async () => {
    try {
      setIsUnlocking(true);

      const bytes = CryptoJS.AES.decrypt(route.params?.encryptedMnemonic || "", password.value);

      const decryptedMnemonic = bytes.toString(CryptoJS.enc.Utf8);

      const isValid = Mnemonic.isValidMnemonic(decryptedMnemonic);

      if (!isValid) {
        throw new Error(t("auth.indentify_certificate_error"));
      }

      const result = await createWallet(decryptedMnemonic);

      if (decryptedMnemonic !== result) {
        throw new Error(t("auth.indentify_certificate_error"));
      }

      dispatch(RegisterAndLogin());
    } catch (e: unknown) {
      console.error(e);
      Toast.error(t("auth.indentify_certificate_error"));
      setIsUnlocking(false);
    }
  };
  return { theme, handleGoback, password, handleUnlock, isUnlocking };
}
