import "@/i18n";
import { RootNavigator } from "@/navigation";
import { AppProvider } from "@/providers";
const App = () => {
  return (
    <AppProvider>
      <RootNavigator />
    </AppProvider>
  );
};

export default App;
