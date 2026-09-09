import { useApp } from "@/hooks";
import { EditableProperty, GroupBasicInfo, CreateGroup } from "../store";
import { getGroupSeqNum, createGroup } from "../services";
import { CreateGroupWallet } from "@/features/wallet";
import { Toast } from "@/components";
import { useAppSelector } from "@/store";
import { CommonActions } from "@react-navigation/native";

export function useGroupSettings() {
  const { navigation, t, ROUTES, dispatch } = useApp();
  const { user, groupBasicSettingDraft } = useAppSelector(state => state.chat);

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleGoCommonEditor = (item: Omit<EditableProperty, "onpress" | "label">) => () => {
    navigation.navigate(ROUTES.CommonEditor, {
      fieldKey: item.fieldKey,
      title: item.title,
      placeholder: item.placeholder,
      target: "groupCreate",
    });
  };

  const handleCreateGroup = async () => {
    try {
      const GroupSeqNum = await getGroupSeqNum();
      const walletInfo = await CreateGroupWallet(GroupSeqNum);

      const { name, groupIntro, joinPrice } = groupBasicSettingDraft;

      if (!walletInfo || !name || !groupIntro) {
        throw new Error(t("chat.create_group_fail"));
      }
      const groupBasicInfo: GroupBasicInfo = {
        ...walletInfo,
        ownerId: user.address,
        name: name,
        groupIntro: groupIntro,
        timestamp: Date.now(),
        joinPrice: String(Math.max(0, Number(joinPrice) || 0)),
      };
      const result: GroupBasicInfo = await createGroup(groupBasicInfo);

      if (!result) {
        throw new Error(t("chat.create_group_fail"));
      }
      dispatch(CreateGroup(result));

      navigation.dispatch(
        CommonActions.reset({
          index: 1,
          routes: [
            { name: ROUTES.MainTab },
            {
              name: ROUTES.Chat,
              params: {
                address: result.address,
              },
            },
          ],
        }),
      );
    } catch (err: unknown) {
      Toast.error(t("chat.create_group_fail"));
      console.error(err);
    }
  };

  const basicGroupInfo: EditableProperty[] = [
    {
      label: t("chat.group_name"),
      fieldKey: "name",
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
    {
      label: t("chat.join_price"),
      fieldKey: "joinPrice",
      title: t("chat.set_join_price"),
      placeholder: t("chat.set_join_price_placeholder"),
      onpress: handleGoCommonEditor,
    },
  ];

  return { handleGoBack, basicGroupInfo, handleCreateGroup };
}
