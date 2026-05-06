import { useMemo, useEffect, useState } from "react";
import { t } from "i18next";
import { useApp } from "@/hooks";
import { useAppSelector } from "@/store";
import { getGroupAllInfo } from "../services";
import { GroupAllInfo, setGroupBasicInfoDraft } from "../store";

export function useGroupInfo() {
  const { navigation, route, dispatch } = useApp();
  const { haveJoinGroups } = useAppSelector(state => state.chat);
  const { address } = route.params;
  const [groupAllInfo, setGroupAllInfo] = useState<GroupAllInfo | null>(null);

  const groupBasicInfo = useMemo(() => {
    return haveJoinGroups?.[address];
  }, [address, haveJoinGroups]);

  // 在跳转到群详情页面的时候，初始化群详情草稿箱
  useEffect(() => {
    dispatch(setGroupBasicInfoDraft(groupBasicInfo));
  }, [dispatch, groupBasicInfo]);

  //获取群成员信息
  useEffect(() => {
    try {
      const handleGetGroupAllInfo = async () => {
        const result: GroupAllInfo = await getGroupAllInfo(groupBasicInfo.address, groupBasicInfo.ownerId);
        setGroupAllInfo(result);
      };
      handleGetGroupAllInfo();
    } catch (err: unknown) {
      console.error(err);
    }
  }, [address, groupBasicInfo.address, groupBasicInfo.ownerId]);

  console.log(groupAllInfo, groupBasicInfo);
  // 返回到上一页面
  const handleGoBack = () => {
    navigation.goBack();
  };

  const groupInfoConfigs = [
    {
      label: t("chat.groupName"),
      fieldKey: "name",
      isLink: true,
    },
    {
      label: t("chat.groupIntro"),
      fieldKey: "groupIntro",
      isLink: true,
    },
    {
      label: t("chat.groupOwner"),
      fieldKey: "groupOwner",
      isLink: true,
    },
    {
      label: t("chat.groupAdmins"),
      fieldKey: "groupAdmins",
      isLink: true,
    },
    {
      label: t("chat.groupMembers"),
      fieldKey: "groupMembers",
      isLink: true,
    },
  ];
  return { handleGoBack, groupInfoConfigs };
}
