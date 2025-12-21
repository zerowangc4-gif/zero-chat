import "@/i18n";
import { useColorScheme } from "react-native";
import { ThemeProvider } from "styled-components/native";
import { Provider } from "react-redux";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { PersistGate } from "redux-persist/integration/react";
import { lightTheme, darkTheme } from "./src/theme/schemas";
import { RootNavigator } from "@/navigation";
import { store, persistor } from "@/store";
const App = () => {
  const isDark = useColorScheme() === "dark";
  const theme = isDark ? darkTheme : lightTheme;

  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ThemeProvider theme={theme}>
            <RootNavigator />
          </ThemeProvider>
        </PersistGate>
      </Provider>
    </SafeAreaProvider>
  );
};

export default App;
