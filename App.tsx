import { SafeAreaProvider } from "react-native-safe-area-context";
import { ChatListScreen } from "@/features/chat";
function App() {
  return (
    <SafeAreaProvider>
      <ChatListScreen />
    </SafeAreaProvider>
  );
}

export default App;
