import { FlatList, StyleSheet } from "react-native";
import styled from "styled-components/native";
import { ChatItem } from "./ChatItem";

import { SearchEntry } from "./SearchEntry";

const Container = styled.View`
  flex: 1;
`;

export function ChatList({ theme, chatSessions, handlePressItem, searchContactPlaceholder, handleAddFriend }) {
  return (
    <Container>
      <FlatList
        data={chatSessions}
        ListHeaderComponent={
          <SearchEntry theme={theme} searchContactPlaceholder={searchContactPlaceholder} onPress={handleAddFriend} />
        }
        renderItem={({ item }) => <ChatItem {...item} theme={theme} onPress={handlePressItem(item)} />}
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
