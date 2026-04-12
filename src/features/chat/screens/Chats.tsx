import { BaseScreen, Header, Main, Portal } from "@/components";
import { AccountInfo, HeaderAction, ChatList, ChatsMenu } from "../components";
import { useChars } from "../hooks";

export function Chats() {
  const { handlePressItem, handleAddFriend, chatSessions, isMenuVisible, handleShowChatsMenu, menuItems } = useChars();
  return (
    <BaseScreen>
      <Header leftElement={<AccountInfo />} rightElement={<HeaderAction handleShowChatsMenu={handleShowChatsMenu} />} />
      <Main hasHeader={true}>
        {isMenuVisible && (
          <Portal id="chats-menu">
            <ChatsMenu menuItems={menuItems} />
          </Portal>
        )}
        <ChatList chatSessions={chatSessions} handlePressItem={handlePressItem} handleAddFriend={handleAddFriend} />
      </Main>
    </BaseScreen>
  );
}
