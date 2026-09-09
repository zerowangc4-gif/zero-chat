import { Alert } from "react-native";
import { ROUTES } from "@/navigation";
import { useApp, useInput } from "@/hooks";
import {
  Message,
  SendChatMessage,
  SendGroupMessage,
  SendRedPacket,
  updateMessagesStatus,
  SyncHavedReadLatestMessage,
  setActiveChatId,
  ContentType,
  getGroupAllInfo,
  joinGroup,
  setHaveJoinGroups,
} from "@/features/chat";
import { useAppSelector } from "@/store";
import { Toast } from "@/components";
import { payUsdc, payUsdcSplit, getBaseWalletBalances } from "@/features/wallet";
import { BASE_CHAIN } from "@/constants";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { MESSAGE_STATUS, MESSAGE_TYPE } from "@/constants";
import { sortMessages, handleFormatMessage } from "../utils";
import { BackHandler, Keyboard, TextInput } from "react-native";
import { t } from "i18next";
import { setWallet } from "../store";

export function useChat() {
  const { route, dispatch, theme, navigation } = useApp<typeof ROUTES.Chat>();

  const { address } = route.params;

  const { chatMap, haveReadUserMap, haveJoinGroups, friends, user, wallet } = useAppSelector(state => state.chat);

  const chatMessages = chatMap[address];
  const isGroupChat = !!haveJoinGroups[address];

  const messages = useMemo(() => sortMessages(Object.values(chatMessages || [])) || [], [chatMessages]);

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
  const redPacketAmount = useInput("");
  const [showEmoji, setShowEmoji] = useState<boolean>(false);
  const [showRedPacket, setShowRedPacket] = useState(false);
  const [paying, setPaying] = useState(false);
  const [inputSelection, setInputSelection] = useState({ start: 0, end: 0 });
  const inputRef = useRef<TextInput | null>(null);
  const emojiSubscription = useRef(null);

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

  useEffect(() => {
    dispatch(setActiveChatId(address));
    return () => {
      dispatch(setActiveChatId(""));
    };
  }, [address, dispatch]);

  const refreshWallet = useCallback(async () => {
    try {
      if (!user.address) {
        return;
      }
      const onChain = await getBaseWalletBalances(user.address);
      dispatch(
        setWallet({
          address: onChain.address,
          balance: onChain.balance,
          ethBalance: onChain.ethBalance,
          earned: wallet?.earned || 0,
          tokenSymbol: onChain.tokenSymbol,
          chain: onChain.chain,
          minAmount: wallet?.minAmount ?? BASE_CHAIN.minAmount,
        }),
      );
    } catch (err) {
      console.error(err);
    }
  }, [dispatch, user.address, wallet?.earned]);

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

  const handleGoBack = () => {
    navigation.goBack();
  };

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

  const onSelectEmoji = (item: string) => () => {
    const before = msg.value.substring(0, inputSelection.start);
    const after = msg.value.substring(inputSelection.end);
    msg.onChange(before + item + after);
    const nextPos = inputSelection.start + item.length;
    setInputSelection({ start: nextPos, end: nextPos });
  };

  const closeInputPanel = () => {
    setShowEmoji(false);
  };

  const handleBackPress = useCallback(() => {
    if (showEmoji || showRedPacket) {
      setShowEmoji(false);
      setShowRedPacket(false);
      return true;
    }
    return false;
  }, [showEmoji, showRedPacket]);

  useEffect(() => {
    const subscription = BackHandler.addEventListener("hardwareBackPress", handleBackPress);
    return () => subscription.remove();
  }, [handleBackPress]);

  useEffect(() => {
    return () => {
      emojiSubscription.current?.remove();
      Keyboard.dismiss();
    };
  }, []);

  const doJoinGroup = async (content: ContentType) => {
    const groupId = content.address;
    if (!groupId || paying) {
      return;
    }

    const joinPrice = Number(content.joinPrice || 0);
    try {
      setPaying(true);
      let paymentTxHash: string | undefined;

      if (joinPrice > 0) {
        if (!content.ownerId) {
          throw new Error(t("chat.pay_failed"));
        }
        Toast.success(t("chat.paying_on_base"));
        const payment = await payUsdc(content.ownerId, joinPrice);
        paymentTxHash = payment.paymentTxHash;
      }

      const result = await joinGroup(groupId, { paymentTxHash });
      if (result?.address) {
        dispatch(setHaveJoinGroups(result));
      }
      await refreshWallet();
      navigation.replace(ROUTES.Chat, { address: groupId });
    } catch (err: unknown) {
      Toast.error((err as Error).message || t("chat.pay_failed"));
      console.error(err);
    } finally {
      setPaying(false);
    }
  };

  const handleGroupLink = (id: string) => () => {
    const content = chatMessages?.[id]?.content;
    const groupId = content?.address;
    if (!groupId) {
      return;
    }

    const isJoinGroup = haveJoinGroups?.[groupId];
    if (isJoinGroup) {
      navigation.replace(ROUTES.Chat, {
        address: groupId,
      });
      return;
    }

    const joinPrice = Number(content.joinPrice || 0);
    if (joinPrice > 0) {
      Alert.alert(
        t("chat.paid_group_title"),
        t("chat.paid_group_confirm", { price: joinPrice, symbol: BASE_CHAIN.tokenSymbol }),
        [
          { text: t("common.cancel"), style: "cancel" },
          {
            text: t("chat.join_group"),
            onPress: () => doJoinGroup(content),
          },
        ],
      );
      return;
    }

    doJoinGroup(content);
  };

  const handleGoNextScreen = () => {
    if (friends[address]) {
      navigation.navigate(ROUTES.FriendSettings, { address: address });
    } else if (haveJoinGroups[address]) {
      navigation.navigate(ROUTES.GroupInfo, { address: address });
    }
  };

  const handleOpenRedPacket = () => {
    Keyboard.dismiss();
    setShowEmoji(false);
    setShowRedPacket(true);
  };

  const handleSendRedPacket = async () => {
    const amount = Number(redPacketAmount.value);
    if (!amount || amount < BASE_CHAIN.minAmount) {
      Toast.error(t("chat.red_packet_invalid"));
      return;
    }
    if ((wallet?.balance || 0) < amount) {
      Toast.error(t("chat.red_packet_insufficient"));
      return;
    }
    if (paying) {
      return;
    }

    try {
      setPaying(true);
      Toast.success(t("chat.paying_on_base"));

      let paymentTxHash: string | undefined;
      let paymentTxHashes: string[] | undefined;

      if (isGroupChat) {
        const info = await getGroupAllInfo(address);
        const recipients = (info.groupMembers || [])
          .map(item => item.address)
          .filter(id => id.toLowerCase() !== user.address.toLowerCase());
        if (recipients.length === 0) {
          throw new Error(t("chat.red_packet_no_members"));
        }
        const payment = await payUsdcSplit(recipients, amount);
        paymentTxHashes = payment.paymentTxHashes;
      } else {
        const payment = await payUsdc(address, amount);
        paymentTxHash = payment.paymentTxHash;
        paymentTxHashes = [payment.paymentTxHash];
      }

      const message = handleFormatMessage(
        address,
        {
          amount,
          text: t("chat.red_packet"),
          paymentTxHash,
          paymentTxHashes,
          tokenSymbol: BASE_CHAIN.tokenSymbol,
        },
        MESSAGE_TYPE.redPacket,
      );
      dispatch(SendRedPacket(message));
      redPacketAmount.onChange("");
      setShowRedPacket(false);
      await refreshWallet();
    } catch (err: unknown) {
      Toast.error((err as Error).message || t("chat.pay_failed"));
      console.error(err);
    } finally {
      setPaying(false);
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
    handleGoNextScreen,
    handleOpenRedPacket,
    showRedPacket,
    setShowRedPacket,
    redPacketAmount,
    handleSendRedPacket,
    wallet,
    isGroupChat,
    paying,
  };
}
