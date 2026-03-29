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
