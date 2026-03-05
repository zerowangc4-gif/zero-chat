import { getOffineChatMessages, Message } from "@/features/chat";
import { MessageService } from "./messageService";
import { removeReadOfflineMessages } from "./singalEmitter";

const getMessageService = () => {
  return MessageService.getInstance();
};

export const syncOfflineMessages = async (currentUserMsgSeqNum: number) => {
  const service = getMessageService();
  if (!service.isSyncing) {
    service.isSyncing = true;
    const messages: Message[] = await getOffineChatMessages(currentUserMsgSeqNum);
    if (messages && messages.length > 0) {
      service.handleIncomingMessages(messages);
      removeReadOfflineMessages(messages[messages.length - 1]);
    }
    service.isSyncing = false;
  }
};
