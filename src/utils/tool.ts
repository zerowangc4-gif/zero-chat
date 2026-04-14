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

// 获取标准时间

export const getFormatTime = (time: number): string => {
  if (time <= 0) return "";

  const date = new Date(time);
  const now = new Date();

  const isSameYear = date.getFullYear() === now.getFullYear();
  const isSameDay = isSameYear && date.getMonth() === now.getMonth() && date.getDate() === now.getDate();

  if (isSameDay) {
    const hours = date.getHours();
    const period = hours < 12 ? "上午" : "下午";
    const displayHours = hours % 12 || 12; // 12小时制转换
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${period} ${displayHours}:${minutes}`;
  }

  if (isSameYear) {
    return `${date.getMonth() + 1}月${date.getDate()}日`;
  }

  return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;
};
