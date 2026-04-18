import { useMemo } from "react";
import { ScrollView } from "react-native";
import styled, { css, useTheme } from "styled-components/native";
import { Avatar } from "@/components";
import { UserInfo } from "../../store";
import { FriendListProps } from "./FriendList";
const Container = styled.View`
  ${({ theme }) => {
    return css`
      background-color: ${theme.colors.base};
    `;
  }}
`;

const AvatarWrapper = styled.Pressable`
  ${({ theme }) => {
    return css`
      padding: ${theme.spacing.step.xxs}px;
    `;
  }}
`;

export function GroupMembers({ groupMembers, handleSelectGroupMember }: FriendListProps) {
  const theme = useTheme();
  const groupMemberList = useMemo(() => Object.values(groupMembers || {}), [groupMembers]);

  return (
    <Container>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} alwaysBounceHorizontal={true}>
        {groupMemberList.map((userInfo: UserInfo) => {
          return (
            <AvatarWrapper key={userInfo.address} onPress={handleSelectGroupMember(userInfo)}>
              <Avatar size={theme.size.ms} avatarSeed={userInfo.avatarSeed} />
            </AvatarWrapper>
          );
        })}
      </ScrollView>
    </Container>
  );
}
