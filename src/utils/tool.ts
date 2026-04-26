import { t } from "i18next";

import { MNEMONIC_PROTOCOL_PREFIX } from "@/constants";

// 获取加密后的助记词
export function getFormatEncryptedMnemonic(ciphertext: string): string {
  return `${MNEMONIC_PROTOCOL_PREFIX}:${ciphertext}`;
}

//校验是否为合法的以太坊地址格式
export const isValidEthereumAddress = (address: string): boolean => {
  const ethAddressRegex = /^0x[a-fA-F0-9]{40}$/;
  return ethAddressRegex.test(address);
};

//校验密码是否有效，大写字母加小写字母加特殊字符
export const validatePassword = (password: string): boolean => {
  const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/;
  return PASSWORD_REGEX.test(password);
};

// 规范化时间
export const getFormatTime = (time: number): string => {
  if (time <= 0) return "";

  const date = new Date(time);
  const now = new Date();

  const isSameYear = date.getFullYear() === now.getFullYear();
  const isSameDay = isSameYear && date.getMonth() === now.getMonth() && date.getDate() === now.getDate();

  if (isSameDay) {
    const hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const displayHours = hours % 12 || 12;

    const periodKey = hours < 12 ? "period_am" : "period_pm";

    return t("common.time.template", {
      period: t(`common.time.${periodKey}`),
      time: `${displayHours}:${minutes}`,
    });
  }

  const yesterday = new Date();
  yesterday.setDate(now.getDate() - 1);

  const isYesterday =
    isSameYear && new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1).toDateString() === date.toDateString();

  if (isYesterday) {
    return t("common.time.yesterday");
  }

  const month = date.getMonth() + 1;
  const day = date.getDate();
  const year = date.getFullYear();

  return isSameYear
    ? t("common.time.format_month_day", { month, day })
    : t("common.time.format_year", { year, month, day });
};
