import styled, { css, useTheme } from "styled-components/native";
import { Avatar, Typography } from "@/components";
import { ChatSession } from "../../store";
import { getFormatTime } from "@/utils";

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

interface Props extends ChatSession {
  handlePressItem: () => void;
}
export function ChatItem(props: Props) {
  const theme = useTheme();

  return (
    <Container
      onPress={props.handlePressItem}
      style={({ pressed }) => ({
        backgroundColor: pressed ? theme.colors.fillSecondary : theme.colors.base,
        opacity: pressed ? theme.interactive.activeOpacity : 1,
      })}>
      <AvatarBox>
        <Avatar avatarSeed={props.avatarSeed} size={theme.size.md} />
      </AvatarBox>
      <Content>
        <TitleRow>
          <Typography type="main" weight="bold">
            {props.name}
          </Typography>
          <Typography type="caption" color={theme.colors.secondaryWord}>
            {getFormatTime(props.time)}
          </Typography>
        </TitleRow>
        <Typography type="caption" color={theme.colors.secondaryWord}>
          {props.lastMsg}
        </Typography>
      </Content>
    </Container>
  );
}
