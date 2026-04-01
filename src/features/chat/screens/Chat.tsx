import { BaseScreen, Main } from "@/components";
import { ChatHeader, MessageList } from "../components";
import { useChat } from "../hooks";

export function Chat() {
  const { theme, navigation, username, messages, user, text, setText, bottom, onSend } = useChat();
  return (
    <BaseScreen>
      <ChatHeader theme={theme} navigation={navigation} username={username} />
      <Main hasHeader={true} enableKeyboardAvoiding={true}>
        <MessageList
          theme={theme}
          messages={messages}
          user={user}
          text={text}
          setText={setText}
          bottom={bottom}
          onSend={onSend}
        />
      </Main>
    </BaseScreen>
  );
}
