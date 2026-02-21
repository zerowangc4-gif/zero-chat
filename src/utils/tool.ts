import { MNEMONIC_PROTOCOL_PREFIX } from "@/constants";
import { hexlify, randomBytes } from "ethers";
export function getFormatEncryptedMnemonic(ciphertext: string): string {
  return `${MNEMONIC_PROTOCOL_PREFIX}:${ciphertext}`;
}

export function generateId(length: number = 16): string {
  return hexlify(randomBytes(length));
}
