import { Contract, JsonRpcProvider, Wallet, formatUnits, parseUnits } from "ethers";
import * as Keychain from "react-native-keychain";
import { BASE_CHAIN, ERC20_ABI, USER_PRIVATE_KEY } from "@/constants";

function getProvider() {
  return new JsonRpcProvider(BASE_CHAIN.rpcUrl, BASE_CHAIN.chainId);
}

function getUsdcContract(runner?: Wallet | JsonRpcProvider) {
  return new Contract(BASE_CHAIN.usdcAddress, ERC20_ABI, runner || getProvider());
}

export async function getStoredPrivateKey(): Promise<string> {
  const credentials = await Keychain.getGenericPassword({ service: USER_PRIVATE_KEY });
  if (!credentials) {
    throw new Error("Wallet not found");
  }
  return credentials.password;
}

export async function getBaseSigner(): Promise<Wallet> {
  const privateKey = await getStoredPrivateKey();
  return new Wallet(privateKey, getProvider());
}

export function toUsdcUnits(amount: number | string): bigint {
  return parseUnits(String(amount), BASE_CHAIN.tokenDecimals);
}

export function fromUsdcUnits(value: bigint | string): number {
  return Number(formatUnits(value, BASE_CHAIN.tokenDecimals));
}

export async function getBaseWalletBalances(address: string): Promise<{
  address: string;
  balance: number;
  ethBalance: number;
  tokenSymbol: string;
  chain: string;
}> {
  const provider = getProvider();
  const usdc = getUsdcContract(provider);
  const [usdcBal, ethBal] = await Promise.all([
    usdc.balanceOf(address) as Promise<bigint>,
    provider.getBalance(address),
  ]);

  return {
    address,
    balance: fromUsdcUnits(usdcBal),
    ethBalance: Number(formatUnits(ethBal, 18)),
    tokenSymbol: BASE_CHAIN.tokenSymbol,
    chain: BASE_CHAIN.name,
  };
}

async function transferUsdc(to: string, amount: number): Promise<string> {
  if (amount <= 0) {
    throw new Error("Invalid amount");
  }
  const signer = await getBaseSigner();
  const usdc = getUsdcContract(signer);
  const tx = await usdc.transfer(to, toUsdcUnits(amount));
  const receipt = await tx.wait();
  return receipt.hash as string;
}

/** Pay full USDC amount to recipient (no platform fee). */
export async function payUsdc(
  recipient: string,
  amount: number,
): Promise<{ paymentTxHash: string }> {
  const paymentTxHash = await transferUsdc(recipient, amount);
  return { paymentTxHash };
}

/** Split USDC across recipients (group red packet), full amount, no platform fee. */
export async function payUsdcSplit(
  recipients: string[],
  amount: number,
): Promise<{ paymentTxHashes: string[] }> {
  const sorted = [...recipients].sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));
  if (sorted.length === 0) {
    throw new Error("No recipients");
  }

  const share = Math.floor((amount / sorted.length) * 1e6) / 1e6;
  const remainder = Math.round((amount - share * sorted.length) * 1e6) / 1e6;

  const paymentTxHashes: string[] = [];
  for (let i = 0; i < sorted.length; i += 1) {
    const part = Math.round((share + (i === 0 ? remainder : 0)) * 1e6) / 1e6;
    if (part > 0) {
      paymentTxHashes.push(await transferUsdc(sorted[i], part));
    }
  }

  return { paymentTxHashes };
}

export function formatUsdc(amount: number | string | undefined): string {
  const n = Number(amount || 0);
  if (!Number.isFinite(n)) {
    return `0 ${BASE_CHAIN.tokenSymbol}`;
  }
  return `${n} ${BASE_CHAIN.tokenSymbol}`;
}

/** @deprecated use payUsdc */
export const payUsdcWithFee = async (recipient: string, amount: number) => {
  const { paymentTxHash } = await payUsdc(recipient, amount);
  return { paymentTxHash, feeTxHash: undefined as string | undefined, fee: 0, net: amount };
};

/** @deprecated use payUsdcSplit */
export const payUsdcSplitWithFee = async (recipients: string[], amount: number) => {
  const { paymentTxHashes } = await payUsdcSplit(recipients, amount);
  return { paymentTxHashes, feeTxHash: undefined as string | undefined, fee: 0, net: amount };
};
