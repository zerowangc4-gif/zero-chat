import styled, { css } from "styled-components/native";
import { Avatar, Typography } from "@/components";
import { useApp } from "@/hooks";
import { size } from "./AccountInfo";
import { useChars } from "@/features/chat/hooks";
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
interface ChatItemProps {
  username: string;
  publicKey: string;
  address: string;
  lastMsg?: string;
  time?: string;
}
export function ChatItem(_props: ChatItemProps) {
  const { theme } = useApp();
  const { username, publicKey } = useChars();
  return (
    <Container>
      <AvatarBox>
        <Avatar publicKey={publicKey} size={size.medium} />
      </AvatarBox>
      <Content>
        <TitleRow>
          <Typography type="main" weight="bold">
            {username}
          </Typography>
          <Typography type="caption" color={theme.colors.secondaryWord}>
            10:20
          </Typography>
        </TitleRow>
        <Typography type="caption" color={theme.colors.secondaryWord}>
          你好这是最后一条信息
        </Typography>
      </Content>
    </Container>
  );
}
