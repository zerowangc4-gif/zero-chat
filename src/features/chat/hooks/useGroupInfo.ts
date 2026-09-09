import { Alert } from "react-native";
import { t } from "i18next";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useApp } from "@/hooks";
import { useAppSelector } from "@/store";
import { getGroupAllInfo, leaveGroup, dissolveGroup, kickMember } from "../services";
import {
  GroupAllInfo,
  setGroupBasicInfoDraft,
  setHaveJoinGroups,
  removeHaveJoinGroup,
  UserInfo,
} from "../store";
import { Toast } from "@/components";

export function useGroupInfo() {
  const { navigation, route, dispatch, ROUTES } = useApp();
  const { haveJoinGroups, user } = useAppSelector(state => state.chat);
  const { address } = route.params;
  const [groupAllInfo, setGroupAllInfo] = useState<GroupAllInfo | null>(null);
  const [loading, setLoading] = useState(false);

  const groupBasicInfo = useMemo(() => haveJoinGroups?.[address], [address, haveJoinGroups]);
  const isOwner = groupBasicInfo?.ownerId === user.address;

  useEffect(() => {
    if (groupBasicInfo) {
      dispatch(setGroupBasicInfoDraft(groupBasicInfo));
    }
  }, [dispatch, groupBasicInfo]);

  const refreshGroupInfo = useCallback(async () => {
    if (!address) {
      return;
    }
    try {
      const result: GroupAllInfo = await getGroupAllInfo(address);
      setGroupAllInfo(result);
      if (result.group) {
        dispatch(setHaveJoinGroups(result.group));
        dispatch(setGroupBasicInfoDraft(result.group));
      }
    } catch (err: unknown) {
      console.error(err);
      Toast.error(t("chat.group_info_fail"));
    }
  }, [address, dispatch]);

  useEffect(() => {
    refreshGroupInfo();
  }, [refreshGroupInfo]);

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleEditField = (fieldKey: "name" | "groupIntro") => () => {
    if (!isOwner) {
      return;
    }
    navigation.navigate(ROUTES.CommonEditor, {
      fieldKey,
      title: fieldKey === "name" ? t("chat.set_group_name") : t("chat.set_group_intro"),
      placeholder: fieldKey === "name" ? t("chat.set_group_name_placeholder") : t("chat.set_group_intro_placeholder"),
      target: "groupEdit",
      groupId: address,
    });
  };

  const handleInvite = () => {
    navigation.navigate(ROUTES.StartGroup, { mode: "invite", groupId: address });
  };

  const handleLeave = () => {
    Alert.alert(t("chat.leave_group"), t("chat.leave_group_confirm"), [
      { text: t("common.cancel"), style: "cancel" },
      {
        text: t("chat.leave_group"),
        style: "destructive",
        onPress: async () => {
          try {
            setLoading(true);
            await leaveGroup(address);
            dispatch(removeHaveJoinGroup(address));
            navigation.popToTop();
          } catch (err: unknown) {
            Toast.error((err as Error).message || t("chat.leave_group_fail"));
          } finally {
            setLoading(false);
          }
        },
      },
    ]);
  };

  const handleDissolve = () => {
    Alert.alert(t("chat.dissolve_group"), t("chat.dissolve_group_confirm"), [
      { text: t("common.cancel"), style: "cancel" },
      {
        text: t("chat.dissolve_group"),
        style: "destructive",
        onPress: async () => {
          try {
            setLoading(true);
            await dissolveGroup(address);
            dispatch(removeHaveJoinGroup(address));
            navigation.popToTop();
          } catch (err: unknown) {
            Toast.error((err as Error).message || t("chat.dissolve_group_fail"));
          } finally {
            setLoading(false);
          }
        },
      },
    ]);
  };

  const handleKick = (member: UserInfo) => () => {
    if (!isOwner || member.address === user.address) {
      return;
    }
    Alert.alert(t("chat.kick_member"), t("chat.kick_member_confirm", { name: member.name }), [
      { text: t("common.cancel"), style: "cancel" },
      {
        text: t("chat.kick_member"),
        style: "destructive",
        onPress: async () => {
          try {
            await kickMember(address, member.address);
            await refreshGroupInfo();
          } catch (err: unknown) {
            Toast.error((err as Error).message || t("chat.kick_member_fail"));
          }
        },
      },
    ]);
  };

  const ownerName = groupAllInfo?.owner?.name || "";
  const adminNames = (groupAllInfo?.groupOwnerMembers || []).map(item => item.name).join("、");
  const memberCount = groupAllInfo?.groupMembers?.length || 0;
  const joinPrice = groupBasicInfo?.joinPrice || "0";

  return {
    handleGoBack,
    handleEditField,
    handleInvite,
    handleLeave,
    handleDissolve,
    handleKick,
    isOwner,
    loading,
    ownerName,
    adminNames,
    memberCount,
    joinPrice,
    members: groupAllInfo?.groupMembers || [],
    groupBasicInfo,
  };
}
