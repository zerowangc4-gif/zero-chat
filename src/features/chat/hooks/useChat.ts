import { ROUTES } from "@/navigation";
import { useApp, useInput } from "@/hooks";
import {
  Message,
  SendChatMessage,
  SendGroupMessage,
  updateMessagesStatus,
  SyncHavedReadLatestMessage,
  setActiveChatId,
} from "@/features/chat";
import { useAppSelector } from "@/store";

import { useEffect, useMemo } from "react";

import { MESSAGE_STATUS, MESSAGE_TYPE } from "@/constants";
import { sortMessages, handleFormatMessage } from "../utils";
export function useChat() {
  const { route, dispatch, theme, navigation } = useApp<typeof ROUTES.Chat>();

  const { address } = route.params;

  const { chatMap, haveReadUserMap, haveJoinGroups, user } = useAppSelector(state => state.chat);

  const messages = useMemo(() => sortMessages(Object.values(chatMap[address] || [])) || [], [address, chatMap]);

  const haveReadlatestMessage = useMemo(() => haveReadUserMap[address] || [], [address, haveReadUserMap]);

  const msg = useInput("");

  // 更新信息已读状态
  useEffect(() => {
    const latestMessage: Message | undefined = messages.find(
      (item: Message) => item.fromId === address || item.fromId !== user.address,
    );
    if (latestMessage && latestMessage.status !== MESSAGE_STATUS.READ) {
      dispatch(
        updateMessagesStatus({
          chatId: address,
          id: latestMessage.id,
          sessionSeqNum: Number(latestMessage.sessionSeqNum),
          status: MESSAGE_STATUS.READ,
        }),
      );
    }

    if (latestMessage && JSON.stringify(latestMessage) !== JSON.stringify(haveReadlatestMessage)) {
      dispatch(SyncHavedReadLatestMessage(latestMessage));
    }
  }, [messages, address, dispatch, haveReadlatestMessage, user.address]);

  // 更新停留在哪个聊天窗口
  useEffect(() => {
    dispatch(setActiveChatId(address));
    return () => {
      dispatch(setActiveChatId(""));
    };
  }, [address, dispatch]);

  // 发送信息
  const onSend = async () => {
    const content = { text: msg.value.trim() };

    const message: Message = handleFormatMessage(address, content, MESSAGE_TYPE.text);

    const isGroupMessage = !!haveJoinGroups[message.toId];

    if (isGroupMessage) {
      dispatch(SendGroupMessage(message));
    } else {
      dispatch(SendChatMessage(message));
    }

    msg.onChange("");
  };
  // 返回到上一页面
  const handleGoBack = () => {
    navigation.goBack();
  };

  return {
    address,
    onSend,
    msg,
    theme,
    messages,
    handleGoBack,
  };
}
