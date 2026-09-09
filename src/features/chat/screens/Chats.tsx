import { BaseScreen, Header, Main, Portal } from "@/components";
import { AccountInfo, HeaderAction, ChatList, ChatsMenu } from "../components";
import { useChats } from "../hooks";

export function Chats() {
  const {
    handlePressItem,
    handleAddFriend,
    chatSessions,
    isMenuVisible,
    handleShowChatsMenu,
    menuItems,
    handleGoProfile,
    keyword,
    setKeyword,
  } = useChats();
  return (
    <BaseScreen>
      <Header
        leftElement={<AccountInfo handleGoProfile={handleGoProfile} />}
        rightElement={<HeaderAction handleShowChatsMenu={handleShowChatsMenu} />}
      />
      <Main hasHeader={true}>
        {isMenuVisible && (
          <Portal id="chats-menu">
            <ChatsMenu menuItems={menuItems} />
          </Portal>
        )}
        <ChatList
          chatSessions={chatSessions}
          handlePressItem={handlePressItem}
          handleAddFriend={handleAddFriend}
          keyword={keyword}
          setKeyword={setKeyword}
        />
      </Main>
    </BaseScreen>
  );
}
