import { FlatList, StyleSheet } from "react-native";
import styled from "styled-components/native";
import { ChatItem } from "./ChatItem";

import { SearchEntry } from "./SearchEntry";

const Container = styled.View`
  flex: 1;
`;

export function ChatList({ theme, handlePressItem, searchContactPlaceholder, handleAddFriend }) {
  return (
    <Container>
      <FlatList
        data={[
          {
            username: "wangC4",
            avatarSeed: "vcdsafvasdvsa",
            lastMsg: "你好",
            time: "12:52",
            address: "csd",
            publicKey: "dd",
          },
        ]}
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
