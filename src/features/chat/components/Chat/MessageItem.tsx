import styled, { useTheme, css } from "styled-components/native";
import { useMemo } from "react";
import { useAppSelector } from "@/store";
import { Message } from "../../store";

import { MESSAGE_TYPE } from "@/constants";
import { Avatar, Typography } from "@/components";
import { TextContent } from "./TextContent";
import { InviteMessageContent } from "./InviteMessageContent";
import { getFormatTime } from "@/utils";

const Container = styled.View`
  ${({ theme }) => {
    return css`
      gap: ${theme.spacing.step.sm}px;
    `;
  }}
`;

const TimeWrapper = styled.View`
  align-items: center;
`;

const MessageWrapper = styled.View<{ $isMe: boolean }>`
  ${({ $isMe }) => {
    return css`
      flex-direction: ${$isMe ? "row-reverse" : "row"};
      align-items: flex-start;
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

const TextWrapper = styled.View<{ $isMe: boolean }>`
  ${({ theme, $isMe }) => {
    return css`
      min-height: ${theme.size.ms}px;
      max-width: 70%;
      justify-content: center;
      background-color: ${$isMe ? theme.colors.chatBubbleMe : theme.colors.chatBubbleOther};
      padding-left: ${theme.spacing.step.sm}px;
      padding-right: ${theme.spacing.step.sm}px;
      border-radius: ${theme.radii.scale.sm}px;
      margin-bottom: ${theme.spacing.step.xs}px;
    `;
  }}
`;
interface MessageItemProps {
  message: Message;
  handleGroupLink: (id: string) => () => void;
}
export function MessageItem({ message, handleGroupLink }: MessageItemProps) {
  const theme = useTheme();

  const { user, friends, groupMembers } = useAppSelector(state => state.chat);

  const { isMe, avatarSeed } = useMemo(() => {
    const _isMe = message.fromId === user.address;

    const _avatarSeed = _isMe
      ? user.avatarSeed
      : friends[message.fromId]?.avatarSeed || groupMembers[message.fromId]?.avatarSeed || "default_seed";

    return {
      isMe: _isMe,
      avatarSeed: _avatarSeed,
    };
  }, [friends, groupMembers, message.fromId, user.address, user.avatarSeed]);

  return (
    <Container>
      {message.showTime && (
        <TimeWrapper>
          <Typography type="caption" color={theme.colors.secondaryWord}>
            {getFormatTime(message.timestamp)}
          </Typography>
        </TimeWrapper>
      )}
      <MessageWrapper $isMe={isMe}>
        <AvatarWrapper>
          <Avatar size={theme.size.ms} avatarSeed={avatarSeed} />
        </AvatarWrapper>

        <TextWrapper $isMe={isMe}>
          {message.type === MESSAGE_TYPE.text && (
            <TextContent isMe={isMe} status={message.status} text={message.content.text} />
          )}
          {message.type === MESSAGE_TYPE.joinGroupNotification && (
            <InviteMessageContent
              isMe={isMe}
              status={message.status}
              id={message.id}
              name={message.content.name}
              handleGroupLink={handleGroupLink}
            />
          )}
        </TextWrapper>
      </MessageWrapper>
    </Container>
  );
}
