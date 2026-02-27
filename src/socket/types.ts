import { MessageStatus } from "@/features/chat";

export interface ChatMessagePayload {
  chatId: string;
  id: string;
  status: MessageStatus;
  sessionSeqNum?: number;
  timestamp: number;
}

export interface ReadReceipt {
  chatId: string;
  lastSessionSeqNum: number;
}
