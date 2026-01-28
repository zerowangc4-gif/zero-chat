import * as Keychain from "react-native-keychain";
import { USER_PRIVATE_KEY } from "@/constants";

export async function savePrivateKey(address: string, privateKey: string) {
  if (!address || !privateKey) {
    throw new Error("MISSING_WALLET_DATA");
  }
  await Keychain.setGenericPassword(address, privateKey, {
    service: USER_PRIVATE_KEY,
  });
}

export async function getPrivateKey() {
  const data = await Keychain.getGenericPassword({ service: USER_PRIVATE_KEY });
  if (data) {
    return data.password;
  }
  throw new Error("PRIVATE_KEY_NOT_FOUND");
}
