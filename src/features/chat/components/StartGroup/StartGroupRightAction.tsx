import { t } from "i18next";
import { HeaderTextAction } from "@/components";

interface Props {
  handleGoGroupSettings: () => void;
  label?: string;
}

export function StartGroupRightAction({ handleGoGroupSettings, label }: Props) {
  return <HeaderTextAction label={label || t("chat.next")} onPress={handleGoGroupSettings} />;
}
