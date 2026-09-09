import { t } from "i18next";
import { store } from "@/store";
import { hexlify, randomBytes } from "ethers";
import { GroupBasicInfo, Message, ContentType } from "@/features/chat";
import { MESSAGE_STATUS, MessageType, MessageStatus, Icon } from "@/constants";

import { useTheme } from "styled-components/native";

export function generateId(length: number = 16): string {
  return hexlify(randomBytes(length));
}

export function resolveChatId(
  message: Message,
  userAddress: string,
  haveJoinGroups: Record<string, GroupBasicInfo>,
): string {
  if (haveJoinGroups[message.toId]) {
    return message.toId;
  }
  return message.fromId === userAddress ? message.toId : message.fromId;
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

export function generateSessionSeqNum(chatId: string): string {
  const { chatMap } = store.getState().chat;
  const messages = Object.values(chatMap[chatId] || {});

  if (messages.length === 0) {
    return [0, Date.now()].join("_");
  }

  const latest = sortMessages(messages)[0];
  return [String(latest.sessionSeqNum).split("_")[0] || "0", Date.now()].join("_");
}

export function handleFormatMessage(toId: string, content: ContentType, type: MessageType): Message {
  const { user } = store.getState().chat;
  return {
    id: generateId(),
    fromId: user.address,
    toId: toId,
    sessionSeqNum: generateSessionSeqNum(toId),
    content: content,
    timestamp: Date.now(),
    type: type,
    status: MESSAGE_STATUS.PENDING,
  };
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

export function getLastFormatMessage(content?: ContentType): string {
  if (!content) {
    return "";
  }
  if (content.packetId && content.amount) {
    return t("chat.red_packet_preview", {
      amount: content.amount,
      symbol: content.tokenSymbol || "USDC",
    });
  }
  if (content.text) {
    return content.text;
  }
  if (content.ownerId && content.name) {
    return t("chat.invite_text", { groupName: content.name });
  }
  return "";
}
