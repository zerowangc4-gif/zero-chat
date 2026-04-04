import { BaseScreen, Main } from "@/components";
import { ChatHeader, MessageList } from "../components";
import { useChat } from "../hooks";

export function Chat() {
  const { messages, onSend, handleGoBack, msg } = useChat();
  return (
    <BaseScreen>
      <ChatHeader handleGoBack={handleGoBack} />
      <Main hasHeader={true} enableKeyboardAvoiding={true}>
        <MessageList messages={messages} msg={msg} onSend={onSend} />
      </Main>
    </BaseScreen>
  );
}
