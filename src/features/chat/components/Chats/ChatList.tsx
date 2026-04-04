import { FlatList, StyleSheet } from "react-native";
import styled from "styled-components/native";
import { UserInfo, ChatSession } from "../../store";
import { ChatItem } from "./ChatItem";

import { SearchEntry } from "./SearchEntry";

const Container = styled.View`
  flex: 1;
`;

export interface Props {
  chatSessions: ChatSession[];
  handlePressItem: (item: UserInfo) => () => void;
  handleAddFriend: () => void;
}

export function ChatList({ chatSessions, handlePressItem, handleAddFriend }: Props) {
  return (
    <Container>
      <FlatList
        data={chatSessions}
        ListHeaderComponent={<SearchEntry handleAddFriend={handleAddFriend} />}
        renderItem={({ item }) => <ChatItem {...item} handlePressItem={handlePressItem(item)} />}
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
