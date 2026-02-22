import { ROUTES } from "@/navigation";
import { useApp } from "@/hooks";
import { insertMessage, MessagePayload, updateMessageStatus, Message } from "@/features/chat";
import { useAppSelector } from "@/store";
import { generateId } from "@/utils";
import { useCallback, useEffect, useState } from "react";
import { sendMessage, sendReadReport } from "@/socket";
export function useChat() {
  const { route, dispatch, theme, insets } = useApp<typeof ROUTES.Chat>();
  const { user } = useAppSelector(state => state.auth);
  const { avatarSeed, username, address } = route.params;
  const messages = useAppSelector(state => state.chat.chatMap[address]);
  const [text, setText] = useState("");

  const bottom = insets.bottom + theme.spacing.step.xs;

  useEffect(() => {
    const opponentMessages = (messages ? messages : []).filter(
      (msg: Message) => msg.fromId === address && typeof msg.seqId === "number",
    );

    if (opponentMessages.length > 0) {
      const lastMsg = opponentMessages[opponentMessages.length - 1];

      if (lastMsg.seqId) {
        sendReadReport(address, lastMsg.seqId);
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
