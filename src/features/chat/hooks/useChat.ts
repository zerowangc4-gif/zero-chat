import { ROUTES } from "@/navigation";
import { useApp } from "@/hooks";
import { insertMessage, MessagePayload, updateMessageStatus, Message } from "@/features/chat";
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
  const lastReportedId = useRef(0);

  useEffect(() => {
    const chatMessages = messages || [];

    const opponentMessages = chatMessages.filter(
      (m: Message) => m.fromId === address && typeof m.seqId === "number" && !isNaN(m.seqId),
    );

    if (opponentMessages.length > 0) {
      const maxSeqId = Math.max(...opponentMessages.map((m: Message) => m.seqId as number));

      console.log("我读到对方的消息最大序号是:", maxSeqId);

      if (!isNaN(maxSeqId) && maxSeqId > lastReportedId.current) {
        sendReadReport(address, maxSeqId);
        lastReportedId.current = maxSeqId;
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
    if (ack.status === "delivered" || ack.status === "sentToServer") {
      dispatch(
        updateMessageStatus({
          chatId: payload.chatId,
          id: payload.message.id,
          status: ack.status,
          seqId: ack.seqId,
        }),
      );
    } else {
      dispatch(
        updateMessageStatus({
          chatId: payload.chatId,
          id: payload.message.id,
          status: "failed",
        }),
      );
    }
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
