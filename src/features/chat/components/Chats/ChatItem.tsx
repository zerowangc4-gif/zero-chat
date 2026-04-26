import styled, { css, useTheme } from "styled-components/native";
import { Avatar, Typography } from "@/components";
import { ChatSession } from "../../store";
import { getFormatTime } from "@/utils";

const Container = styled.Pressable`
  ${({ theme }) => css`
    flex-direction: row;
    height: ${theme.size.lg}px;
    align-items: center;
    padding: 0 ${theme.spacing.step.md}px;
    background-color: ${theme.colors.base};
  `}
`;

const AvatarBox = styled.View`
  ${({ theme }) => css`
    height: ${theme.size.lg}px;
    justify-content: center;
    padding-right: ${theme.spacing.step.md}px;
  `}
`;

const Content = styled.View`
  ${({ theme }) => css`
    flex: 1;
    gap: ${theme.spacing.step.xs}px;
  `}
`;

const TitleRow = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const NameText = styled(Typography)`
  flex: 1;
  margin-right: ${({ theme }) => theme.spacing.step.sm}px;
`;

const TimeText = styled(Typography)`
  flex-shrink: 0;
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
          <NameText type="main" weight="bold" numberOfLines={1}>
            {props.name}
          </NameText>

          <TimeText type="caption" color={theme.colors.secondaryWord} numberOfLines={1}>
            {getFormatTime(props.timestamp)}
          </TimeText>
        </TitleRow>

        <Typography type="caption" color={theme.colors.secondaryWord} numberOfLines={1}>
          {props.lastMsg}
        </Typography>
      </Content>
    </Container>
  );
}
