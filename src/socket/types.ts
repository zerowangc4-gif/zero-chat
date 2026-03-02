export interface SocketContextType {
  isConnected: boolean;
}
export interface SocketProviderType {
  token: string;
  children: React.ReactNode;
}

export interface ReadReceipt {
  chatId: string;
  lastSessionSeqNum: number;
}
