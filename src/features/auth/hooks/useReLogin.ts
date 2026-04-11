import { useState } from "react";
import { useApp, useInput } from "@/hooks";
import { launchImageLibrary } from "react-native-image-picker";
import BarcodeScanning from "@react-native-ml-kit/barcode-scanning";
import { Mnemonic } from "ethers";
import { MNEMONIC_PROTOCOL_PREFIX } from "@/constants";
import { Toast } from "@/components";
import { t } from "i18next";
import { ROUTES } from "@/navigation";
import { createWallet } from "@/features/wallet";
import { RegisterAndLogin } from "../store";

export function useReLogin() {
  const { navigation, dispatch } = useApp();

  const mnemonic = useInput("");

  const [mnemonics, setMnemonics] = useState<Record<string, string>>({
    "1": "",
    "2": "",
    "3": "",
    "4": "",
    "5": "",
    "6": "",
    "7": "",
    "8": "",
    "9": "",
    "10": "",
    "11": "",
    "12": "",
  });
  const filledCount = Object.keys(mnemonics).filter(key => mnemonics[key] !== "").length;

  // 输入助记词点击保存
  const handleSaveMnemonic = () => {
    const inputValue = mnemonic.value.trim();

    if (!inputValue) return;

    const words = inputValue.split(/\s+/);

    if (words.length === 12) {
      const newMnemonics: Record<string, string> = {};

      words.forEach((word, index) => {
        newMnemonics[String(index + 1)] = word;
      });

      setMnemonics(newMnemonics);
    } else {
      const cleanSingleWord = inputValue.replace(/\s+/g, "");

      const targetKey = Object.keys(mnemonics)
        .filter(key => mnemonics[key] === "")
        .sort((a, b) => Number(a) - Number(b))[0];

      if (!targetKey) return;

      setMnemonics(prev => ({
        ...prev,
        [targetKey]: cleanSingleWord,
      }));
    }

    mnemonic.onChange("");
  };
  //  删除输入错误的助记词
  const handleRemoveMnemonic = (key: string) => () => {
    setMnemonics(prev => ({
      ...prev,
      [key]: "",
    }));
  };

  const handleReLogin = async () => {
    try {
      const mnemonicString = Object.values(mnemonics).join(" ").trim();

      const isValid = Mnemonic.isValidMnemonic(mnemonicString);

      if (!isValid) {
        throw new Error(t("auth.indentify_certificate_error"));
      }

      const result = await createWallet(mnemonicString);

      if (mnemonicString !== result) {
        throw new Error(t("auth.indentify_certificate_error"));
      }

      dispatch(RegisterAndLogin());
    } catch (e: unknown) {
      console.error(e);
      Toast.error(t("auth.indentify_certificate_error"));
    }
  };

  // 扫描二维码，检测是否合规
  const handleIdentifyQRCode = async () => {
    try {
      const result = await launchImageLibrary({
        mediaType: "photo",
        quality: 1,
        selectionLimit: 1,
      });

      const imageUri = result?.assets?.[0]?.uri;

      if (!imageUri) {
        return;
      }

      const barcodes = await BarcodeScanning.scan(imageUri);

      if (!barcodes || barcodes.length === 0) {
        throw new Error(t("indentify_certificate_error"));
      }

      const rawContent = barcodes[0].value;

      if (!rawContent || !rawContent.includes(":")) {
        throw new Error(t("indentify_certificate_error"));
      }

      const [protocolPrefix, encryptedMnemonic] = rawContent.split(":");

      if (protocolPrefix !== MNEMONIC_PROTOCOL_PREFIX || !encryptedMnemonic) {
        throw new Error(t("indentify_certificate_error"));
      }

      navigation.navigate(ROUTES.UnlockIdentity, {
        encryptedMnemonic: encryptedMnemonic,
      });
    } catch (e: unknown) {
      console.error(e);
      Toast.error(t("indentify_certificate_error"));
    }
  };

  return {
    mnemonic,
    mnemonics,
    handleIdentifyQRCode,
    handleSaveMnemonic,
    handleRemoveMnemonic,
    handleReLogin,
    filledCount,
  };
}
