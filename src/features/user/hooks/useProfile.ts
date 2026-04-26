import Clipboard from "@react-native-clipboard/clipboard";
import { useEffect } from "react";
import { useApp } from "@/hooks";
import { t } from "i18next";
import { useAppSelector } from "@/store";
import { Toast } from "@/components";
import { setUserDraft, setUserDraftProperty } from "@/features/chat";

export function useProfile() {
  const { navigation, dispatch, ROUTES } = useApp();

  const { user } = useAppSelector(state => state.chat);

  // 在跳转到个人信息页面的时候，初始化个人信息草稿箱
  useEffect(() => {
    dispatch(setUserDraft(user));
  }, [dispatch, user]);

  // 返回上一页
  const handleGoBack = () => {
    navigation.goBack();
  };

  // 处理点击之后的事件
  const handleItemPress = (fieldKey: string) => () => {
    switch (fieldKey) {
      case "address":
        Clipboard.setString(user.address);
        Toast.success(t("user.copy_account_sucess_toast"));
        break;

      case "name":
        navigation.navigate(ROUTES.UserCommonEditor, {
          fieldKey: fieldKey,
          title: t("user.set_user_name"),
          placeholder: t("user.set_user_name"),
        });
        break;

      case "avatarSeed":
        dispatch(
          setUserDraftProperty({
            fieldKey: "avatarSeed",
            value: user.avatarSeed + Date.now(),
          }),
        );
        break;
    }
  };

  const userInfoConfigs = [
    {
      label: t("user.avatar"),
      fieldKey: "avatarSeed",
      isLink: true,
    },
    {
      label: t("user.name"),
      fieldKey: "name",
      isLink: true,
    },
    {
      label: t("user.address"),
      fieldKey: "address",
      isLink: false,
    },
  ];

  return { handleGoBack, handleItemPress, userInfoConfigs };
}
