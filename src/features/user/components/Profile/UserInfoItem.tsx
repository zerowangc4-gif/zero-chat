import { InfoRow } from "@/components";
import { useAppSelector } from "@/store";

interface Props {
  fieldKey: string;
  label: string;
  isLink: boolean;
  onPress: (value: string) => void;
}

export function UserInfoItem({ fieldKey, label, isLink, onPress }: Props) {
  const { user, userDraft } = useAppSelector(state => state.chat);
  const draft = userDraft as unknown as Record<string, string>;
  const current = user as unknown as Record<string, string>;
  const value = draft?.[fieldKey] || current?.[fieldKey] || "";

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
