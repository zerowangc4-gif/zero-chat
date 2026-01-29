import { Wallet, HDNodeWallet } from "ethers";
import { WalletType } from "../types";

export function createRandomMnemonic(): string {
  const wallet = Wallet.createRandom();
  return wallet.mnemonic!.phrase;
}

export function deriveWalletFromMnemonic(mnemonic: string): WalletType {
  const hdNode = HDNodeWallet.fromPhrase(mnemonic);
  return {
    mnemonic,
    address: hdNode.address,
    privateKey: hdNode.privateKey,
    publicKey: hdNode.publicKey,
  };
}
