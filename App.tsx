import "@/i18n";
import ToastAPI from "react-native-toast-message";
import { Toast } from "@/components";
import { useColorScheme } from "react-native";
import { ThemeProvider } from "styled-components/native";
import { Provider } from "react-redux";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { PersistGate } from "redux-persist/integration/react";
import { KeyboardProvider } from "react-native-keyboard-controller";
import { lightTheme, darkTheme } from "@/theme";
import { RootNavigator } from "@/navigation";
import { store, persistor } from "@/store";
const App = () => {
  const isDark = useColorScheme() === "dark";
  const theme = isDark ? darkTheme : lightTheme;
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <KeyboardProvider>
            <ThemeProvider theme={theme}>
              <RootNavigator />
              <ToastAPI config={Toast.config} />
            </ThemeProvider>
          </KeyboardProvider>
        </PersistGate>
      </Provider>
    </SafeAreaProvider>
  );
};

export default App;
