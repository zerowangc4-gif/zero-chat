import { ROUTES } from "@/navigation";
import { useApp } from "@/hooks";
import {
  Message,
  generateId,
  generateSessionSeqNum,
  SendChatMessage,
  updateMessagesStatus,
  SyncHavedReadLatestMessage,
  setActiveChatId,
} from "@/features/chat";
import { useAppSelector } from "@/store";

import { useEffect, useMemo, useState } from "react";

import { MESSAGE_STATUS, MESSAGE_TYPE } from "@/constants";
export function useChat() {
  const { route, dispatch, theme, insets } = useApp<typeof ROUTES.Chat>();
  const { user } = useAppSelector(state => state.auth);
  const { avatarSeed, username, address } = route.params;
  const { chatMap, haveReadUserMap, activeChatId } = useAppSelector(state => state.chat);

  const messages = useMemo(() => chatMap[address] || [], [address, chatMap]);
  const haveReadlatestMessage = useMemo(() => haveReadUserMap[address] || [], [address, haveReadUserMap]);

  const [text, setText] = useState("");

  const bottom = insets.bottom + theme.spacing.step.xs;

  useEffect(() => {
    const latestMessage: Message | undefined = messages.find((item: Message) => item.fromId === address);
    if (latestMessage && latestMessage.status !== MESSAGE_STATUS.READ) {
      dispatch(
        updateMessagesStatus({
          chatId: address,
          id: latestMessage.id,
          sessionSeqNum: parseInt(String(latestMessage.sessionSeqNum), 10),
          status: MESSAGE_STATUS.READ,
        }),
      );
    }
    if (JSON.stringify(latestMessage) !== JSON.stringify(haveReadlatestMessage)) {
      dispatch(SyncHavedReadLatestMessage(latestMessage));
    }
  }, [messages, address, dispatch, haveReadlatestMessage, activeChatId]);

  useEffect(() => {
    dispatch(setActiveChatId(address));
    return () => {
      dispatch(setActiveChatId(""));
    };
  }, [address, dispatch]);

  const onSend = async () => {
    const message: Message = {
      id: generateId(),
      fromId: user.address,
      toId: address,
      sessionSeqNum: generateSessionSeqNum(address),
      content: text.trim(),
      timestamp: Date.now(),
      type: MESSAGE_TYPE.TEXT,
      status: MESSAGE_STATUS.PENDING,
    };

    dispatch(SendChatMessage(message));

    setText("");
  };

  return {
    avatarSeed,
    username,
    address,
    user,
    onSend,
    setText,
    text,
    bottom,
    theme,
    messages,
  };
}
