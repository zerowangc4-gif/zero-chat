import { ethers, TransactionRequest } from "ethers";
import { walletStorage } from "./walletStorage";

/** * 网络配置
 * 生产环境建议使用 Alchemy 或 Infura 的私有 RPC URL
 */
const RPC_URL = "https://polygon-rpc.com";

export const transferService = {
  /**
   * 发送转账交易（工业级优化版）
   * @param to 接收方地址
   * @param amount 转账金额（单位：MATIC/ETH）
   * @returns Promise<TransactionResponse>
   */
  sendTransaction: async (to: string, amount: string) => {
    try {
      // 1. 初始化 Provider
      const provider = new ethers.JsonRpcProvider(RPC_URL);

      // 2. 从安全存储提取私钥
      // 提示：私钥仅在此局部作用域存在，函数结束会被 GC 回收
      const walletData = await walletStorage.loadWallet();
      if (!walletData) {
        throw new Error("未检测到本地钱包，请先创建或导入钱包");
      }

      // 3. 创建钱包实例并关联 Provider
      const wallet = new ethers.Wallet(walletData.privateKey, provider);

      // 4. 前置校验：地址合法性与金额格式
      if (!ethers.isAddress(to)) {
        throw new Error("接收地址格式不正确");
      }
      const value = ethers.parseEther(amount);

      // 5. 并行获取链上必要参数（减少网络往返时间）
      // 获取当前费率、账户余额、最新的 Nonce 以及网络信息
      const [feeData, balance, nonce, network] = await Promise.all([
        provider.getFeeData(),
        provider.getBalance(wallet.address),
        provider.getTransactionCount(wallet.address, "pending"), // 使用 pending 获取待处理 Nonce，防止连发失败
        provider.getNetwork(),
      ]);

      // 6. 预估 Gas Limit 并增加缓冲
      // 默认普通转账是 21000n，增加 20% 缓冲区以应对链上状态突变导致的失败
      const estimatedGas = await wallet.estimateGas({ to, value }).catch(() => 21000n);
      const gasLimit = (estimatedGas * 120n) / 100n;

      // 7. 费用计算与安全校验 (EIP-1559 协议)
      // 计算 maxFeePerGas (最高愿意支付的总价)
      const maxFee = feeData.maxFeePerGas ?? feeData.gasPrice ?? 0n;
      // 工业做法：给小费 (PriorityFee) 增加 10% 溢价，确保矿工优先处理你的交易
      const priorityFee = feeData.maxPriorityFeePerGas ? (feeData.maxPriorityFeePerGas * 110n) / 100n : 0n;

      // 计算本次转账的总成本 = 金额 + 手续费上限
      const totalCost = value + gasLimit * maxFee;

      if (balance < totalCost) {
        throw new Error(
          `余额不足。需要: ${ethers.formatEther(totalCost)} MATIC, 当前: ${ethers.formatEther(balance)} MATIC`,
        );
      }

      // 8. 构造标准 EIP-1559 交易请求
      const tx: TransactionRequest = {
        to,
        value,
        nonce,
        gasLimit,
        maxFeePerGas: maxFee,
        maxPriorityFeePerGas: priorityFee,
        chainId: network.chainId,
        type: 2, // 明确标注为 EIP-1559 交易类型
      };

      // 9. 签名并广播交易
      // 此步骤会经历：私钥签名 -> 发送到 RPC 节点 -> 节点进入 Mempool
      const response = await wallet.sendTransaction(tx);

      console.log("交易已成功广播:", response.hash);

      // 返回响应对象，UI 层可以根据需要调用 response.wait() 等待上链
      return response;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      // 生产环境建议将错误分类（如网络错误、拒绝签名、余额不足等）
      console.error("Transfer Service Error:", error);

      // 友好的错误信息转化
      if (error.code === "INSUFFICIENT_FUNDS") {
        throw new Error("账户余额不足以支付金额或手续费");
      } else if (error.code === "NETWORK_ERROR") {
        throw new Error("网络连接失败，请检查节点地址或网络状态");
      }

      throw error;
    }
  },
};
