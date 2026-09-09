import { t } from "i18next";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useAppSelector } from "@/store";
import { useApp } from "@/hooks";
import {
  setActiveChatId,
  UserInfo,
  Message,
  ChatSession,
  ChatType,
  clearGroupMembersDraft,
  clearGroupBasicSettingDraft,
  setUserDraft,
  setGroupBasicInfoDraft,
  EMPTY_GROUP_BASIC_INFO,
} from "../store";
import { Icon } from "@/constants";
import { OverlayLayer } from "@/components";
import { useFocusEffect } from "@react-navigation/native";
import { getLastFormatMessage } from "../utils";

export function useChats() {
  const { dispatch, navigation, ROUTES } = useApp();

  const { friends, haveJoinGroups, lastMessageMap } = useAppSelector(state => state.chat);

  const [isMenuVisible, setMenuVisible] = useState<boolean>(false);
  const [keyword, setKeyword] = useState("");

  const chatSessions: ChatSession[] = useMemo(() => {
    const currentLastMsgMap = lastMessageMap || {};

    return Object.keys({ ...friends, ...haveJoinGroups })
      .map((address: string) => {
        const isGroup = !!haveJoinGroups[address];
        const source = friends[address] || haveJoinGroups[address];
        const { avatarSeed, publicKey, timestamp } = source;
        const name = friends[address] ? friends[address].alias : haveJoinGroups[address].name;

        const message: Message = currentLastMsgMap[address];
        return {
          address: address,
          publicKey: publicKey,
          name: name,
          avatarSeed: avatarSeed,
          lastMsg: getLastFormatMessage(message?.content),
          timestamp: message?.timestamp || timestamp || Date.now(),
          chatType: isGroup ? ChatType.GROUP : ChatType.SINGLE,
        };
      })
      .filter(session => {
        if (!keyword.trim()) {
          return true;
        }
        const q = keyword.trim().toLowerCase();
        return session.name?.toLowerCase().includes(q) || session.address.toLowerCase().includes(q);
      })
      .sort((sessionA, sessionB) => sessionB.timestamp - sessionA.timestamp);
  }, [friends, haveJoinGroups, lastMessageMap, keyword]);

  const handlePressItem = (item: UserInfo) => () => {
    navigation.navigate(ROUTES.Chat, {
      address: item.address,
    });
  };

  const handleAddFriend = () => {
    navigation.navigate(ROUTES.AddFriend);
    setMenuVisible(false);
    OverlayLayer.hide();
  };

  const handleCreateGroup = () => {
    navigation.navigate(ROUTES.StartGroup, { mode: "create" });
    setMenuVisible(false);
    OverlayLayer.hide();
  };

  useFocusEffect(
    useCallback(() => {
      dispatch(setActiveChatId(""));
      dispatch(clearGroupMembersDraft());
      dispatch(clearGroupBasicSettingDraft());
      dispatch(
        setUserDraft({
          address: "",
          publicKey: "",
          name: "",
          avatarSeed: "",
        }),
      );
      dispatch(setGroupBasicInfoDraft(EMPTY_GROUP_BASIC_INFO));
    }, [dispatch]),
  );

  useEffect(() => {
    return () => {
      OverlayLayer.hide();
    };
  }, []);

  const handleShowChatsMenu = () => {
    setMenuVisible(true);
    OverlayLayer.show(() => {
      setMenuVisible(false);
    });
  };

  const menuItems = [
    { iconName: Icon.addFriend, text: t("chat.menu_item_add_friend"), onPress: handleAddFriend },
    { iconName: Icon.chat, text: t("chat.menu_item_start_group"), onPress: handleCreateGroup },
  ];

  const handleGoProfile = () => {
    navigation.navigate(ROUTES.Profile);
  };

  return {
    handlePressItem,
    handleAddFriend,
    chatSessions,
    menuItems,
    isMenuVisible,
    handleShowChatsMenu,
    handleGoProfile,
    keyword,
    setKeyword,
  };
}

export const useChars = useChats;
