import { Text } from "react-native"
import { SafeAreaProvider } from "react-native-safe-area-context"
function App() {
  return (
    <SafeAreaProvider>
      <Text>this is my app</Text>
    </SafeAreaProvider>
  )
}

export default App
