import { useApp, useInput } from "@/hooks";
import { useAppSelector } from "@/store";
import { setGroupBasicSettingDraft } from "../store";
export function useCommonEditor() {
  const { theme, navigation, route, dispatch } = useApp();
  const { fieldKey, title, placeholder } = route.params;
  const GroupBasicSettingInfo = useAppSelector(state => state.chat.GroupBasicSettingDraft) || {};

  const activeProperty = useInput(GroupBasicSettingInfo[fieldKey || ""]);

  // 返回到上一页面
  const handleGoBack = () => {
    navigation.goBack();
  };

  // 修改属性
  const handleSetProperty = () => {
    dispatch(
      setGroupBasicSettingDraft({
        fieldKey: fieldKey,
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
    GroupBasicSettingInfo,
    handleSetProperty,
  };
}
