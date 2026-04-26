import { BaseScreen, Main } from "@/components";
import { ChatHeader, MessageList } from "../components";
import { useChat } from "../hooks";

export function Chat() {
  const {
    formatMessages,
    onSend,
    handleGoBack,
    msg,
    showEmoji,
    handleEmojiPanel,
    onSelectEmoji,
    closeInputPanel,
    setInputSelection,
    inputRef,
    handleGroupLink,
  } = useChat();
  return (
    <BaseScreen>
      <ChatHeader handleGoBack={handleGoBack} />
      <Main hasHeader={true} enableKeyboardAvoiding={true}>
        <MessageList
          messages={formatMessages}
          msg={msg}
          onSend={onSend}
          showEmoji={showEmoji}
          handleEmojiPanel={handleEmojiPanel}
          onSelectEmoji={onSelectEmoji}
          closeInputPanel={closeInputPanel}
          setInputSelection={setInputSelection}
          inputRef={inputRef}
          handleGroupLink={handleGroupLink}
        />
      </Main>
    </BaseScreen>
  );
}
