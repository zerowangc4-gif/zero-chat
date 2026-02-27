import { MessageStatus } from "@/features/chat";

export interface ChatMessagePayload {
  chatId: string;
  formId: string;
  id: string;
  content: string;
  status: MessageStatus;
  sessionSeqNum?: number;
  timestamp: number;
}

export interface ReadReceipt {
  chatId: string;
  lastSessionSeqNum: number;
}
