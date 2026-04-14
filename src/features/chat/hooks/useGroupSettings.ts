import { useApp } from "@/hooks";
import { EditableProperty } from "../store";
export function useGroupSettings() {
  const { navigation, t, ROUTES } = useApp();
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

  return { handleGoBack, basicGroupInfo };
}
