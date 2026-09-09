/** Base chain payment config (USDC). No platform fee — full amount goes to recipient. */
export const BASE_CHAIN = {
  chainId: 8453,
  name: "Base",
  rpcUrl: "https://mainnet.base.org",
  explorerTx: "https://basescan.org/tx/",
  nativeSymbol: "ETH",
  tokenSymbol: "USDC",
  tokenDecimals: 6,
  /** Official USDC on Base mainnet */
  usdcAddress: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
  minAmount: 0.01,
} as const;

export const ERC20_ABI = [
  "function balanceOf(address owner) view returns (uint256)",
  "function decimals() view returns (uint8)",
  "function symbol() view returns (string)",
  "function transfer(address to, uint256 amount) returns (bool)",
  "event Transfer(address indexed from, address indexed to, uint256 value)",
] as const;
