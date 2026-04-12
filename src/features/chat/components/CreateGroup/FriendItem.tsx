import styled, { css, useTheme } from "styled-components/native";
import { UserInfo } from "../../store";
import { Avatar, Typography } from "@/components";
import IconFont from "@/assets/font/iconfont";
import { Icon } from "@/constants";

const Container = styled.Pressable`
  ${({ theme }) => {
    return css`
      flex-direction: row;
      align-items: center;
      padding-left: ${theme.spacing.step.md}px;
      gap: ${theme.spacing.step.md}px;
    `;
  }}
`;

const CheckBox = styled.View``;

const AvatarWrapper = styled.View`
  ${({ theme }) => {
    return css`
      padding-top: ${theme.spacing.step.md}px;
      padding-bottom: ${theme.spacing.step.md}px;
    `;
  }}
`;

interface Props {
  userInfo: UserInfo;
  groupMembers: Record<string, UserInfo>;
  handleSelectGroupMember: (userInfo: UserInfo) => () => void;
}

export function FriendItem({ userInfo, groupMembers, handleSelectGroupMember }: Props) {
  const theme = useTheme();
  return (
    <Container
      style={({ pressed }) => ({
        backgroundColor: pressed ? theme.colors.fillSecondary : theme.colors.base,
        opacity: pressed ? theme.interactive.activeOpacity : 1,
      })}
      onPress={handleSelectGroupMember(userInfo)}>
      <CheckBox>
        {groupMembers[userInfo.address] ? (
          <IconFont name={Icon.selected} size={theme.typography.size.lg} color={theme.palette.brand} />
        ) : (
          <IconFont name={Icon.unselected} size={theme.typography.size.lg} color={theme.colors.secondaryWord} />
        )}
      </CheckBox>
      <AvatarWrapper>
        <Avatar size={theme.size.ms} avatarSeed={userInfo.avatarSeed} />
      </AvatarWrapper>
      <Typography weight="bold">{userInfo.username}</Typography>
    </Container>
  );
}
