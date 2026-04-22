import styled, { useTheme, css } from "styled-components/native";
import { useAppSelector } from "@/store";
import { Message } from "../../store";
import { Avatar, Typography } from "@/components";
import { getFormatTime } from "@/utils";
import { MESSAGE_TYPE } from "@/constants";
const Container = styled.View`
  ${() => {
    return css`
      flex-direction: row;
      padding-right: 25%;
    `;
  }}
`;
const AvatarWrapper = styled.View`
  ${({ theme }) => {
    return css`
      padding-left: ${theme.spacing.step.xs}px;
      padding-right: ${theme.spacing.step.xs}px;
    `;
  }}
`;

const TextWrapper = styled.View`
  ${({ theme }) => {
    return css`
      min-height: ${theme.size.ms}px;
      justify-content: center;
      background-color: ${theme.palette.brand};
      padding-left: ${theme.spacing.step.sm}px;
      padding-right: ${theme.spacing.step.sm}px;
      border-radius: ${theme.radii.scale.sm}px;
      margin-bottom: ${theme.spacing.step.xs}px;
    `;
  }}
`;
const MetaINfoWrapper = styled.View`
  ${({ theme }) => {
    return css`
      flex-direction: row;
      gap: ${theme.radii.scale.sm}px;
    `;
  }}
`;
const GroupNotificationCard = styled.View`
  gap: 4px;
`;
export function MessageItem(message: Message) {
  const theme = useTheme();
  const { user, friends } = useAppSelector(state => state.chat);

  const isMe = message.fromId === user.address;

  const friendId = isMe ? message.toId : message.fromId;

  const avatarSeed = isMe ? user.avatarSeed : friends[friendId]?.avatarSeed || "888";

  return (
    <Container>
      <AvatarWrapper>
        <Avatar size={theme.size.ms} avatarSeed={avatarSeed} />
      </AvatarWrapper>
      {MESSAGE_TYPE.text === message.type ? (
        <TextWrapper>
          <Typography>{message.content.text}</Typography>
          <MetaINfoWrapper>
            <Typography type="caption">{getFormatTime(message.timestamp)}</Typography>
            <Typography type="caption">{message.status}</Typography>
          </MetaINfoWrapper>
        </TextWrapper>
      ) : (
        <GroupNotificationCard>
          <Typography type="caption">{message.content.groupName}</Typography>
          <Typography type="caption">邀请您加入</Typography>
        </GroupNotificationCard>
      )}
    </Container>
  );
}
