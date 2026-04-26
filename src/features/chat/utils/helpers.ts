import { store } from "@/store";
import { hexlify, randomBytes } from "ethers";
import { Message, ContentType } from "@/features/chat";
import { MESSAGE_STATUS, MessageType, MessageStatus, Icon } from "@/constants";

import { useTheme } from "styled-components/native";

export function generateId(length: number = 16): string {
  return hexlify(randomBytes(length));
}

export function generateSessionSeqNum(chatId: string): string {
  const { chatMap } = store.getState().chat;

  if (!chatMap[chatId] || !chatMap[chatId].length) {
    return [0, Date.now()].join("_");
  }

  const message: Message = chatMap[chatId][0];

  return [String(message.sessionSeqNum).split("_")[0], Date.now()].join("_");
}

export function sortMessages(messages: Message[]): Message[] {
  return [...messages].sort((a: Message, b: Message) => {
    const [aLeft, aRight] = String(a.sessionSeqNum).split("_").map(Number);
    const [bLeft, bRight] = String(b.sessionSeqNum).split("_").map(Number);

    if (bLeft !== aLeft) {
      return bLeft - aLeft;
    }

    return (bRight || 0) - (aRight || 0);
  });
}

export function handleFormatMessage(toId: string, content: ContentType, type: MessageType): Message {
  const { user } = store.getState().chat;
  const message = {
    id: generateId(),
    fromId: user.address,
    toId: toId,
    sessionSeqNum: generateSessionSeqNum(toId),
    content: content,
    timestamp: Date.now(),
    type: type,
    status: MESSAGE_STATUS.PENDING,
  };

  return message;
}

export function useMessageStatus(status: MessageStatus) {
  const theme = useTheme();

  const iconConfig = {
    [MESSAGE_STATUS.FAILED]: {
      name: Icon.msFail,
      size: theme.typography.size.xs,
      color: theme.palette.error,
    },
    [MESSAGE_STATUS.PENDING]: {
      name: Icon.msPending,
      size: theme.typography.size.xs,
      color: theme.colors.secondaryWord,
    },
    [MESSAGE_STATUS.SENT_TO_SERVER]: {
      name: Icon.msDelivered,
      size: theme.typography.size.xs,
      color: theme.colors.secondaryWord,
    },
    [MESSAGE_STATUS.DELIVERED]: {
      name: Icon.msDelivered,
      size: theme.typography.size.xs,
      color: theme.colors.secondaryWord,
    },
    [MESSAGE_STATUS.READ]: {
      name: Icon.msRead,
      size: theme.typography.size.xs,
      color: theme.colors.secondaryWord,
    },
  };

  return iconConfig[status];
}
