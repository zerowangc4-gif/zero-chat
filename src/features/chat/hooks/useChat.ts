import { ROUTES } from "@/navigation";
import { useApp } from "@/hooks";
import { insertMessage, MessagePayload, updateMessage, Message } from "@/features/chat";
import { useAppSelector } from "@/store";
import { generateId } from "@/utils";
import { useCallback, useEffect, useRef, useState } from "react";
import { sendMessage, sendReadReport } from "@/socket";
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
      const lastSessionSeqNum = msg.sessionSeqNum;
      if (lastSessionSeqNum > lastChatReadNum.current && msg.status !== "read") {
        sendReadReport(address, lastSessionSeqNum);
        lastChatReadNum.current = lastSessionSeqNum;
      }
    }
  }, [messages, address]);

  const formatMessage = useCallback(
    (content: string): MessagePayload => {
      return {
        chatId: address,
        message: {
          id: generateId(),
          toId: address,
          fromId: user.address,
          content: content.trim(),
          timestamp: Date.now(),
          type: "text",
          status: "pending",
        },
      };
    },
    [address, user.address],
  );

  const onSend = async () => {
    const payload = formatMessage(text);
    dispatch(insertMessage(payload));
    setText("");
    const ack = await sendMessage({
      toId: address,
      content: text,
      clientMsgId: payload.message.id,
    });
    dispatch(
      updateMessage({
        chatId: ack.chatId,
        id: ack.id,
        status: ack.status,
        sessionSeqNum: ack.sessionSeqNum,
        timestamp: ack.timestamp,
      }),
    );
  };

  return {
    avatarSeed,
    username,
    address,
    user,
    formatMessage,
    onSend,
    setText,
    text,
    bottom,
    theme,
    messages,
  };
}
