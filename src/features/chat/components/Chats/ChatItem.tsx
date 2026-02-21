import styled, { css } from "styled-components/native";
import { Avatar, Typography } from "@/components";
import { size } from "./AccountInfo";
import { useChars, Contacts } from "@/features/chat";
const Container = styled.Pressable`
  ${({ theme }) => {
    return css`
      flex-direction: row;
      height: ${theme.size.lg}px;
      align-items: center;
      padding-left: ${theme.spacing.step.md}px;
      padding-right: ${theme.spacing.step.md}px;
      background-color: ${theme.colors.base};
    `;
  }}
`;

const AvatarBox = styled.View`
  ${({ theme }) => {
    return css`
      height: ${theme.size.lg}px;
      justify-content: center;
      padding-right: ${theme.spacing.step.md}px;
    `;
  }}
`;

const Content = styled.View`
  ${({ theme }) => {
    return css`
      flex: 1;
      gap: ${theme.spacing.step.xs}px;
    `;
  }}
`;
const TitleRow = styled.View`
  ${() => {
    return css`
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
    `;
  }}
`;
export interface ChatItemProps extends Contacts {
  lastMsg?: string;
  time?: string;
  onPress?: () => void;
}
export function ChatItem({ username, avatarSeed, lastMsg, time, onPress }: ChatItemProps) {
  const { theme } = useChars();

  return (
    <Container
      onPress={onPress}
      style={({ pressed }) => ({
        backgroundColor: pressed ? theme.colors.fillSecondary : theme.colors.base,
        opacity: pressed ? theme.interactive.activeOpacity : 1,
      })}>
      <AvatarBox>
        <Avatar avatarSeed={avatarSeed} size={size.medium} />
      </AvatarBox>
      <Content>
        <TitleRow>
          <Typography type="main" weight="bold">
            {username}
          </Typography>
          <Typography type="caption" color={theme.colors.secondaryWord}>
            {time}
          </Typography>
        </TitleRow>
        <Typography type="caption" color={theme.colors.secondaryWord}>
          {lastMsg}
        </Typography>
      </Content>
    </Container>
  );
}
