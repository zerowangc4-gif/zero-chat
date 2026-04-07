import { useInput } from "@/hooks";
import { useState } from "react";
export function useReLogin() {
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

  // 输入助记词
  const handleSaveMnemonic = () => {
    if (!mnemonic.value.trim()) return;

    const targetKey = Object.keys(mnemonics)
      .filter(key => mnemonics[key] === "")
      .sort((a, b) => Number(a) - Number(b))[0];

    if (!targetKey) {
      return;
    }

    setMnemonics(prev => ({
      ...prev,
      [targetKey]: mnemonic.value,
    }));

    mnemonic.onChange("");
  };

  return { mnemonic, mnemonics, handleSaveMnemonic };
}
