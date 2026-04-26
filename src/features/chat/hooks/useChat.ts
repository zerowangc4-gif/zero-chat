import { ROUTES } from "@/navigation";
import { useApp, useInput } from "@/hooks";
import {
  Message,
  SendChatMessage,
  SendGroupMessage,
  updateMessagesStatus,
  SyncHavedReadLatestMessage,
  setActiveChatId,
  JoinGroup,
  ContentType,
} from "@/features/chat";
import { useAppSelector } from "@/store";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { MESSAGE_STATUS, MESSAGE_TYPE } from "@/constants";
import { sortMessages, handleFormatMessage } from "../utils";
import { BackHandler, Keyboard, TextInput } from "react-native";
export function useChat() {
  const { route, dispatch, theme, navigation } = useApp<typeof ROUTES.Chat>();

  const { address } = route.params;

  const { chatMap, haveReadUserMap, haveJoinGroups, user } = useAppSelector(state => state.chat);

  const chatMessages = chatMap[address];

  const messages = useMemo(() => sortMessages(Object.values(chatMessages || [])) || [], [chatMessages]);

  //对于消息时间的是否显示加一个判断值不影响其他的逻辑，仅在渲染的时候起效
  const formatMessages = useMemo(() => {
    const TIME_THRESHOLD = 5 * 60 * 1000;

    return messages.map((item: Message, index: number) => {
      const prev = index < messages.length - 1 ? messages[index + 1] : null;

      const isTimeout = prev ? item.timestamp - prev.timestamp > TIME_THRESHOLD : true;

      return {
        ...item,
        showTime: isTimeout,
      };
    });
  }, [messages]);

  const haveReadlatestMessage = useMemo(() => haveReadUserMap[address] || [], [address, haveReadUserMap]);

  const msg = useInput("");

  const [showEmoji, setShowEmoji] = useState<boolean>(false);

  const [inputSelection, setInputSelection] = useState({ start: 0, end: 0 });

  const inputRef = useRef<TextInput | null>(null);

  const emojiSubscription = useRef(null);

  // 更新信息已读状态
  useEffect(() => {
    const latestMessage: Message | undefined = messages.find((item: Message) => item.fromId !== user.address);
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
    const content = { text: msg.value.trim() } as ContentType;

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

  // 处理表情面板

  const handleEmojiPanel = () => {
    emojiSubscription.current?.remove();

    if (!showEmoji) {
      if (!Keyboard.isVisible()) {
        setShowEmoji(true);
        return;
      }

      emojiSubscription.current = Keyboard.addListener("keyboardDidHide", () => {
        setShowEmoji(true);
        emojiSubscription.current?.remove();
      });

      inputRef.current?.blur();
      Keyboard.dismiss();
    } else {
      setShowEmoji(false);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  };

  //选择表情
  const onSelectEmoji = (item: string) => () => {
    const before = msg.value.substring(0, inputSelection.start);
    const after = msg.value.substring(inputSelection.end);
    msg.onChange(before + item + after);
    const nextPos = inputSelection.start + item.length;
    setInputSelection({ start: nextPos, end: nextPos });
  };

  // 关闭输入页面的面板
  const closeInputPanel = () => {
    setShowEmoji(false);
  };

  // 在退出页面的时候先关闭面板
  const handleBackPress = useCallback(() => {
    if (showEmoji) {
      setShowEmoji(false);
      return true;
    }
    return false;
  }, [showEmoji]);

  useEffect(() => {
    const subscription = BackHandler.addEventListener("hardwareBackPress", handleBackPress);

    return () => subscription.remove();
  }, [handleBackPress]);

  // 专门负责在页面销毁时，清理所有残留的订阅
  useEffect(() => {
    return () => {
      emojiSubscription.current?.remove();
      Keyboard.dismiss();
    };
  }, []);

  // 处理点击群邀请链接
  const handleGroupLink = (id: string) => () => {
    const groupId = chatMessages?.[id]?.content?.address;

    if (groupId) {
      return;
    }

    const isJoinGroup = haveJoinGroups?.[groupId];

    if (isJoinGroup) {
      navigation.replace(ROUTES.Chat, {
        address: groupId,
      });
    } else {
      dispatch(JoinGroup(chatMessages[id].content));
    }
  };

  return {
    address,
    onSend,
    msg,
    theme,
    formatMessages,
    handleGoBack,
    handleEmojiPanel,
    showEmoji,
    onSelectEmoji,
    closeInputPanel,
    setInputSelection,
    inputRef,
    handleGroupLink,
  };
}
