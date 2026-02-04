import { MNEMONIC_PROTOCOL_PREFIX } from "@/constants";
export function getFormatEncryptedMnemonic(ciphertext: string): string {
  return `${MNEMONIC_PROTOCOL_PREFIX}:${ciphertext}`;
}
