import * as Keychain from "react-native-keychain";
import { Wallet, HDNodeWallet } from "ethers";
import { store } from "@/store";
import { setUserInfo } from "@/features/chat";
import { USER_PRIVATE_KEY } from "@/constants";

export async function createWallet(): Promise<string> {
  const wallet: HDNodeWallet = Wallet.createRandom();
  await Keychain.setGenericPassword(wallet.address, wallet.privateKey, {
    service: USER_PRIVATE_KEY,
    accessible: Keychain.ACCESSIBLE.WHEN_UNLOCKED_THIS_DEVICE_ONLY,
  });

  store.dispatch(
    setUserInfo({
      address: wallet.address,
      publicKey: wallet.publicKey,
      username: `User_${wallet.address.slice(-4).toUpperCase()}`,
      avatarSeed: wallet.publicKey,
    }),
  );

  return wallet.mnemonic!.phrase;
}

export async function signWithStoredWallet(message: string): Promise<string> {
  const credentials = (await Keychain.getGenericPassword({
    service: USER_PRIVATE_KEY,
  })) as Keychain.UserCredentials;

  return new Wallet(credentials.password).signMessage(message);
}
