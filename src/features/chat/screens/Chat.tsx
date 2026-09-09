import { BaseScreen, Main } from "@/components";
import { ChatHeader, MessageList, RedPacketModal } from "../components";
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
    handleGoNextScreen,
    handleOpenRedPacket,
    showRedPacket,
    setShowRedPacket,
    redPacketAmount,
    handleSendRedPacket,
    wallet,
  } = useChat();
  return (
    <BaseScreen>
      <ChatHeader handleGoBack={handleGoBack} handleGoNextScreen={handleGoNextScreen} />
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
          handleOpenRedPacket={handleOpenRedPacket}
        />
      </Main>
      <RedPacketModal
        visible={showRedPacket}
        amount={redPacketAmount}
        balance={wallet?.balance}
        onClose={() => setShowRedPacket(false)}
        onSend={handleSendRedPacket}
      />
    </BaseScreen>
  );
}
