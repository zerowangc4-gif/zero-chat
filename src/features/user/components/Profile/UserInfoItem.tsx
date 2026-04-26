import styled, { css, useTheme } from "styled-components/native";
import { Typography, Avatar } from "@/components";
import { useAppSelector } from "@/store";
import IconFont from "@/assets/font/iconfont";
import { Icon } from "@/constants";

const Container = styled.Pressable`
  ${({ theme }) => {
    return css`
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      background-color: ${theme.colors.surfaceBg};
    `;
  }}
`;

const Label = styled.View`
  ${({ theme }) => {
    return css`
      padding: ${theme.spacing.step.md}px;
    `;
  }}
`;

const ValueWrapper = styled.View`
  ${({ theme }) => {
    return css`
      flex: 1;
      flex-direction: row;
      justify-content: flex-end;
      padding-right: ${theme.spacing.step.xs}px;
      gap: ${theme.spacing.step.xs}px;
    `;
  }}
`;
const IconWrapper = styled.View`
  ${({ theme }) => {
    return css`
      padding: ${theme.spacing.step.md}px;
    `;
  }}
`;
interface Props {
  fieldKey: string;
  label: string;
  isLink: boolean;
  onPress: (value: string) => void;
}

export function UserInfoItem({ fieldKey, label, isLink, onPress }: Props) {
  const theme = useTheme();

  const { user, userDraft } = useAppSelector(state => state.chat);

  const value = userDraft?.[fieldKey] || user?.[fieldKey];

  return (
    <Container
      onPress={() => onPress(value)}
      style={({ pressed }) => ({
        backgroundColor: pressed ? theme.colors.fillSecondary : theme.colors.base,
      })}>
      <Label>
        <Typography weight="bold">{label}</Typography>
      </Label>

      <ValueWrapper>
        {fieldKey === "avatarSeed" ? (
          <Avatar avatarSeed={value} size={theme.size.xs} />
        ) : (
          <Typography numberOfLines={1} ellipsizeMode="middle" color={theme.colors.secondaryWord}>
            {value}
          </Typography>
        )}
      </ValueWrapper>

      <IconWrapper>
        <IconFont
          name={isLink ? Icon.go : Icon.copy}
          size={theme.typography.size.md}
          color={theme.colors.secondaryWord}
        />
      </IconWrapper>
    </Container>
  );
}
