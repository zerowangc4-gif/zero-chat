import styled, { css, useTheme } from "styled-components/native";
import { Typography } from "@/components";
import { useAppSelector } from "@/store";
import IconFont from "@/assets/font/iconfont";
import { Icon } from "@/constants";
import { EditableProperty } from "../../store";

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

export function BasicSettingItem({ label, fieldKey, title, placeholder, onpress }: EditableProperty) {
  const theme = useTheme();
  const GroupBasicSettingDraft = useAppSelector(state => state.chat.GroupBasicSettingDraft) || {};
  return (
    <Container
      onPress={onpress({ fieldKey: fieldKey, title: title, placeholder: placeholder })}
      style={({ pressed }) => ({
        backgroundColor: pressed ? theme.colors.fillSecondary : theme.colors.base,
        opacity: pressed ? theme.interactive.activeOpacity : 1,
      })}>
      <Label>
        <Typography weight="bold">{label}</Typography>
      </Label>
      <ValueWrapper>
        <Typography color={theme.colors.secondaryWord}>{GroupBasicSettingDraft[fieldKey || ""]}</Typography>
      </ValueWrapper>
      <IconWrapper>
        <IconFont name={Icon.go} size={theme.typography.size.md} />
      </IconWrapper>
    </Container>
  );
}
