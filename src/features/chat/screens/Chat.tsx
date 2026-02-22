import { BaseScreen, Main } from "@/components";
import { ChatHeader, MessageList } from "@/features/chat";

export function Chat() {
  return (
    <BaseScreen>
      <ChatHeader />
      <Main hasHeader={true} enableKeyboardAvoiding={true}>
        <MessageList />
      </Main>
    </BaseScreen>
  );
}
