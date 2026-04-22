import * as Keychain from "react-native-keychain";
import { Wallet, HDNodeWallet } from "ethers";
import { store } from "@/store";
import { setUserInfo } from "@/features/chat";
import { USER_PRIVATE_KEY } from "@/constants";

export async function createWallet(mnemonic?: string): Promise<string> {
  const wallet: HDNodeWallet = mnemonic ? Wallet.fromPhrase(mnemonic) : Wallet.createRandom();

  await Keychain.setGenericPassword(wallet.address, wallet.privateKey, {
    service: USER_PRIVATE_KEY,
    accessible: Keychain.ACCESSIBLE.WHEN_UNLOCKED_THIS_DEVICE_ONLY,
  });

  store.dispatch(
    setUserInfo({
      address: wallet.address,
      publicKey: wallet.publicKey,
      name: `user${wallet.address.slice(-4).toLowerCase()}`,
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

export async function CreateGroupWallet(groupSeqNum: number) {
  const credentials = await Keychain.getGenericPassword({ service: USER_PRIVATE_KEY });

  if (!credentials) return null;

  const groupWallet = HDNodeWallet.fromSeed(credentials.password).deriveChild(groupSeqNum);

  return {
    seqNum: groupSeqNum,
    address: groupWallet.address,
    publicKey: groupWallet.publicKey,
    avatarSeed: groupWallet.publicKey,
  };
}
