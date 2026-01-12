import { useAppNavigation, useAppRoute, ROUTES } from "@/navigation";
import { useTranslation } from "react-i18next";
import { useTheme } from "styled-components/native";
export function useApp() {
  const navigation = useAppNavigation();
  const { t } = useTranslation();
  const theme = useTheme();
  const route = useAppRoute();
  return { navigation, route, ROUTES, t, theme };
}
