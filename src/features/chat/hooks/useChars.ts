import { t } from "i18next";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useAppSelector } from "@/store";
import { useApp } from "@/hooks";
import {
  setActiveChatId,
  UserInfo,
  Message,
  ChatSession,
  clearGroupMembersDraft,
  clearGroupBasicSettingDraft,
} from "../store";
import { Icon } from "@/constants";
import { OverlayLayer } from "@/components";
import { useFocusEffect } from "@react-navigation/native";

export function useChars() {
  const { dispatch, navigation, ROUTES } = useApp();

  const { friends, lastMessageMap } = useAppSelector(state => state.chat);

  const [isMenuVisible, setMenuVisible] = useState<boolean>(false);

  // 好友列表
  const chatSessions: ChatSession[] = useMemo(() => {
    const currentLastMsgMap = lastMessageMap || {};

    return Object.values(friends || {})
      .map((item: UserInfo) => {
        const message: Message = currentLastMsgMap[item.address];
        return { ...item, lastMsg: message?.content.text || "", time: message?.timestamp || 0 };
      })
      .sort((sessionA, sessionB) => sessionB.time - sessionA.time);
  }, [friends, lastMessageMap]);

  //  跳转到聊天页面
  const handlePressItem = (item: UserInfo) => () => {
    navigation.navigate(ROUTES.Chat, {
      address: item.address,
      username: item.username,
      avatarSeed: item.avatarSeed,
      publicKey: item.publicKey,
    });
  };

  //  跳转到加好友页面
  const handleAddFriend = () => {
    navigation.navigate(ROUTES.AddFriend);
    setMenuVisible(false);
    OverlayLayer.hide();
  };

  //  跳转到创建群页面页面
  const handleCreateGroup = () => {
    navigation.navigate(ROUTES.CreateGroup);
    setMenuVisible(false);
    OverlayLayer.hide();
  };

  //执行清理工作
  useFocusEffect(
    useCallback(() => {
      dispatch(setActiveChatId(""));
      dispatch(clearGroupMembersDraft());
      dispatch(clearGroupBasicSettingDraft());
    }, [dispatch]),
  );

  //  页面卸载的时候关闭遮罩层
  useEffect(() => {
    return () => {
      OverlayLayer.hide();
    };
  }, []);

  //打开遮罩层，和菜单
  const handleShowChatsMenu = () => {
    setMenuVisible(true);
    OverlayLayer.show(() => {
      setMenuVisible(false);
    });
  };

  // 菜单数据
  const menuItems = [
    { iconName: Icon.addFriend, text: t("chat.menu_item_add_friend"), onPress: handleAddFriend },
    { iconName: Icon.chat, text: t("chat.menu_item_start_group"), onPress: handleCreateGroup },
  ];

  return { handlePressItem, handleAddFriend, chatSessions, menuItems, isMenuVisible, handleShowChatsMenu };
}
