import { useApp, useInput } from "@/hooks";
import { useAppSelector } from "@/store";
import { setGroupBasicSettingDraft, setUserDraftProperty, setHaveJoinGroups } from "../store";
import { updateGroupInfo } from "../services";
import { Toast } from "@/components";
import { t } from "i18next";
import { useRoute } from "@react-navigation/native";
import { ROUTES } from "@/navigation";

export function useCommonEditor() {
  const { theme, navigation, route, dispatch } = useApp();
  const navRoute = useRoute();
  const { fieldKey, title, placeholder, groupId } = route.params;
  const target =
    route.params?.target || (navRoute.name === ROUTES.UserCommonEditor ? "user" : "groupCreate");
  const { groupBasicSettingDraft, userDraft, haveJoinGroups } = useAppSelector(state => state.chat);

  const currentValue =
    target === "user"
      ? String((userDraft as unknown as Record<string, string> | undefined)?.[fieldKey] || "")
      : target === "groupEdit"
        ? String(
            (haveJoinGroups?.[groupId || ""] as unknown as Record<string, unknown> | undefined)?.[fieldKey] || "",
          )
        : groupBasicSettingDraft?.[fieldKey] || "";

  const activeProperty = useInput(currentValue);

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleSetProperty = async () => {
    if (target === "user") {
      dispatch(
        setUserDraftProperty({
          fieldKey,
          value: activeProperty.value,
        }),
      );
      navigation.goBack();
      return;
    }

    if (target === "groupEdit" && groupId) {
      try {
        const result = await updateGroupInfo({
          groupId,
          [fieldKey]: activeProperty.value,
        });
        dispatch(setHaveJoinGroups(result));
        Toast.success(t("user.info_update_success"));
      } catch (err: unknown) {
        Toast.error(t("user.info_update_failed"));
        console.error(err);
        return;
      }
      navigation.goBack();
      return;
    }

    dispatch(
      setGroupBasicSettingDraft({
        fieldKey,
        value: activeProperty.value,
      }),
    );
    navigation.goBack();
  };

  return {
    theme,
    title,
    placeholder,
    fieldKey,
    activeProperty,
    handleGoBack,
    currentValue,
    handleSetProperty,
  };
}
