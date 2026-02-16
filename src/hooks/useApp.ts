import { useAppNavigation, useAppRoute, ROUTES, AllParamList } from "@/navigation";
import { useTranslation } from "react-i18next";
import { useTheme } from "styled-components/native";
import { useAppDispatch } from "@/store";
import { useSafeAreaInsets } from "react-native-safe-area-context";
export function useApp<T extends keyof AllParamList>() {
  const navigation = useAppNavigation();
  const { t } = useTranslation();
  const theme = useTheme();
  const route = useAppRoute<T>();
  const dispatch = useAppDispatch();
  const insets = useSafeAreaInsets();
  return { navigation, route, ROUTES, t, theme, dispatch, insets };
}
