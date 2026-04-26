import { useApp, useInput } from "@/hooks";
import { useAppSelector } from "@/store";
import { setUserDraftProperty } from "@/features/chat";
export function useUserCommonEditor() {
  const { theme, navigation, route, dispatch } = useApp();
  const { fieldKey, title, placeholder } = route.params;
  const userDraft = useAppSelector(state => state.chat.userDraft) || {};

  const activeProperty = useInput(userDraft[fieldKey || ""]);

  // 返回到上一页面
  const handleGoBack = () => {
    navigation.goBack();
  };

  // 修改属性
  const handleSetProperty = () => {
    dispatch(
      setUserDraftProperty({
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
    userDraft,
    handleSetProperty,
  };
}
