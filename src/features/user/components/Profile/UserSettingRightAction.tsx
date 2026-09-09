import { t } from "i18next";
import { HeaderTextAction } from "@/components";

interface Props {
  handleUpdateUserInfo: () => void;
}

export function UserSettingRightAction({ handleUpdateUserInfo }: Props) {
  return <HeaderTextAction label={t("chat.done")} onPress={handleUpdateUserInfo} />;
}
