import { t } from "i18next";
import { HeaderTextAction } from "@/components";

interface Props {
  handleSetProperty: () => void;
}

export function SetPropertyRightAction({ handleSetProperty }: Props) {
  return <HeaderTextAction label={t("chat.next")} onPress={handleSetProperty} />;
}
