import { ROUTES } from "@/navigation";
import { useApp } from "@/hooks";
import { updateMessage, Message, insertMessages, generateId, generateSessionSeqNum } from "@/features/chat";
import { useAppSelector } from "@/store";

import { useEffect, useRef, useState } from "react";
import { sendMessage, sendReadReport } from "@/socket";
import { MESSAGE_STATUS, MESSAGE_TYPE } from "@/constants";
export function useChat() {
  const { route, dispatch, theme, insets } = useApp<typeof ROUTES.Chat>();
  const { user } = useAppSelector(state => state.auth);
  const { avatarSeed, username, address } = route.params;
  const messages = useAppSelector(state => state.chat.chatMap[address]);
  const [text, setText] = useState("");

  const bottom = insets.bottom + theme.spacing.step.xs;

  const lastChatReadNum = useRef(0);

  useEffect(() => {
    const chatMessages = messages || [];

    const msg: Message | undefined = chatMessages.find((item: Message) => item.fromId === address);

    if (msg) {
      const lastSessionSeqNum = parseInt(String(msg.sessionSeqNum), 10);
      if (lastSessionSeqNum > lastChatReadNum.current && msg.status !== MESSAGE_STATUS.READ) {
        sendReadReport(address, lastSessionSeqNum);
        lastChatReadNum.current = lastSessionSeqNum;
      }
    }
  }, [messages, address]);

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

    dispatch(insertMessages([message]));

    setText("");

    const result: Message = await sendMessage(message);

    dispatch(updateMessage(result));
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
