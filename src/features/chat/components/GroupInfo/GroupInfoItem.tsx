import { InfoRow } from "@/components";
import { useAppSelector } from "@/store";

interface Props {
  fieldKey: string;
  label: string;
  isLink: boolean;
  onPress: (value: string) => void;
}

export function GroupInfoItem({ fieldKey, label, isLink, onPress }: Props) {
  const { groupBasicInfoDraft } = useAppSelector(state => state.chat);
  const value = String(groupBasicInfoDraft?.[fieldKey] ?? "");

  return (
    <InfoRow
      label={label}
      value={value}
      isAvatar={fieldKey === "avatarSeed"}
      isLink={isLink}
      onPress={() => onPress(value)}
    />
  );
}
