import { t } from "i18next";
import { HeaderTextAction } from "@/components";

interface Props {
  handleCreateGroup: () => void;
}

export function GroupSettingRightAction({ handleCreateGroup }: Props) {
  return <HeaderTextAction label={t("chat.done")} onPress={handleCreateGroup} />;
}
