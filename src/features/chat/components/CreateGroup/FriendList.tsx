import styled from "styled-components/native";
import { FlatList, StyleSheet } from "react-native";
import { useMemo } from "react";
import { FriendItem } from "./FriendItem";
import { UserInfo } from "../../store";
import { useAppSelector } from "@/store";

const Container = styled.View`
  flex: 1;
`;

export interface FriendListProps {
  groupMembers: Record<string, UserInfo>;
  handleSelectGroupMember: (userInfo: UserInfo) => () => void;
}
export function FriendList({ groupMembers, handleSelectGroupMember }: FriendListProps) {
  const { friends } = useAppSelector(state => state.chat);

  const friendList = useMemo(() => Object.values(friends || {}), [friends]);

  return (
    <Container>
      <FlatList
        data={friendList}
        renderItem={({ item }) => (
          <FriendItem userInfo={item} groupMembers={groupMembers} handleSelectGroupMember={handleSelectGroupMember} />
        )}
        keyExtractor={item => item.publicKey}
        contentContainerStyle={styles.listContentContainer}
        showsVerticalScrollIndicator={false}
        removeClippedSubviews={true}
        windowSize={5}
        initialNumToRender={10}
      />
    </Container>
  );
}

const styles = StyleSheet.create({
  listContentContainer: {
    flexGrow: 1,
    paddingBottom: 8,
  },
});
