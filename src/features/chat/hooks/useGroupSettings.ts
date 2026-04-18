import { useApp } from "@/hooks";
import { EditableProperty, GroupBasicInfo, CreateGroup } from "../store";
import { getGroupSeqNum, createGroup } from "../services";
import { CreateGroupWallet } from "@/features/wallet";
import { Toast } from "@/components";
import { useAppSelector } from "@/store";
export function useGroupSettings() {
  const { navigation, t, ROUTES, dispatch } = useApp();
  const { user, groupBasicSettingDraft } = useAppSelector(state => state.chat);
  // 返回到上一页面
  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleGoCommonEditor = (item: Omit<EditableProperty, "onpress" | "label">) => () => {
    navigation.navigate(ROUTES.CommonEditor, {
      fieldKey: item.fieldKey,
      title: item.title,
      placeholder: item.placeholder,
    });
  };

  const handleCreateGroup = async () => {
    try {
      const GroupSeqNum = await getGroupSeqNum();
      const walletInfo = await CreateGroupWallet(GroupSeqNum);
      const { groupName, groupIntro } = groupBasicSettingDraft;

      if (!walletInfo || !groupName || !groupIntro) {
        throw new Error(t("chat.create_group_fail"));
      }
      const groupBasicInfo: GroupBasicInfo = {
        ...walletInfo,
        ownerId: user.address,
        groupName: groupName,
        groupIntro: groupIntro,
        timestamp: Date.now(),
      };
      const result: GroupBasicInfo = await createGroup(groupBasicInfo);
      if (!result) {
        throw new Error(t("chat.create_group_fail"));
      }
      dispatch(CreateGroup(result));
    } catch (err: unknown) {
      Toast.error(t("chat.create_group_fail"));
      console.error(err);
    }
  };

  //初始群信息
  const basicGroupInfo: EditableProperty[] = [
    {
      label: t("chat.group_name"),
      fieldKey: "groupName",
      title: t("chat.set_group_name"),
      placeholder: t("chat.set_group_name_placeholder"),
      onpress: handleGoCommonEditor,
    },
    {
      label: t("chat.group_intro"),
      fieldKey: "groupIntro",
      title: t("chat.set_group_intro"),
      placeholder: t("chat.set_group_intro_placeholder"),
      onpress: handleGoCommonEditor,
    },
  ];

  return { handleGoBack, basicGroupInfo, handleCreateGroup };
}
