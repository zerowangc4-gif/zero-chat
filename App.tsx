import "@/i18n";
import { useColorScheme } from "react-native";
import { ThemeProvider } from "styled-components/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { lightTheme, darkTheme } from "./src/theme/schemas";
import { RootNavigator } from "@/navigation";

const App = () => {
  const isDark = useColorScheme() === "dark";
  const theme = isDark ? darkTheme : lightTheme;

  return (
    <SafeAreaProvider>
      <ThemeProvider theme={theme}>
        <RootNavigator />
      </ThemeProvider>
    </SafeAreaProvider>
  );
};

export default App;
