import styled, { css, useTheme } from "styled-components/native";
import { Avatar, Typography } from "@/components";
import { ChatSession, ChatType } from "../../store";
import { getFormatTime } from "@/utils";
import { t } from "i18next";

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

const NameRow = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
  margin-right: ${({ theme }) => theme.spacing.step.sm}px;
  gap: ${({ theme }) => theme.spacing.step.xs}px;
`;

const NameText = styled(Typography)`
  flex-shrink: 1;
`;

const Badge = styled.View`
  ${({ theme }) => css`
    padding: 0 ${theme.spacing.step.xxs}px;
    border-radius: ${theme.radii.scale.xs}px;
    background-color: ${theme.colors.fillSecondary};
  `}
`;

const TimeText = styled(Typography)`
  flex-shrink: 0;
`;

interface Props extends ChatSession {
  handlePressItem: () => void;
}

export function ChatItem(props: Props) {
  const theme = useTheme();
  const isGroup = props.chatType === ChatType.GROUP;

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
          <NameRow>
            {isGroup && (
              <Badge>
                <Typography type="caption" color={theme.colors.secondaryWord}>
                  {t("chat.group_badge")}
                </Typography>
              </Badge>
            )}
            <NameText type="main" weight="bold" numberOfLines={1}>
              {props.name}
            </NameText>
          </NameRow>

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
