import { BaseScreen, Header, Main, ActionIcon, Input } from "@/components";
import { useCommonEditor } from "../hooks";
import { SetPropertyRightAction } from "../components";
import { Icon } from "@/constants";
export function CommonEditor() {
  const {
    theme,
    title,
    placeholder,
    fieldKey,
    activeProperty,
    handleGoBack,
    GroupBasicSettingInfo,
    handleSetProperty,
  } = useCommonEditor();
  return (
    <BaseScreen>
      <Header
        leftElement={
          <ActionIcon
            name={Icon.back}
            size={theme.typography.size.lg}
            color={theme.colors.baseInverse}
            onPress={handleGoBack}
          />
        }
        title={title}
        rightElement={
          activeProperty.value !== (GroupBasicSettingInfo[fieldKey] || "") &&
          !!activeProperty.value && <SetPropertyRightAction handleSetProperty={handleSetProperty} />
        }
      />
      <Main hasHeader={true}>
        <Input
          value={activeProperty.value}
          onChangeText={activeProperty.onChange}
          placeholder={placeholder}
          clear={!!activeProperty.value}
        />
      </Main>
    </BaseScreen>
  );
}
