import { BaseScreen, Header, Main, ActionIcon, Input, HeaderTextAction } from "@/components";
import { useCommonEditor } from "../hooks";
import { Icon } from "@/constants";
import { t } from "i18next";

export function CommonEditor() {
  const { theme, title, placeholder, activeProperty, handleGoBack, currentValue, handleSetProperty } =
    useCommonEditor();
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
          activeProperty.value !== (currentValue || "") &&
          !!activeProperty.value && (
            <HeaderTextAction label={t("chat.next")} onPress={handleSetProperty} />
          )
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
