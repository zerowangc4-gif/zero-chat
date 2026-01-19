import { useAppNavigation, useAppRoute, ROUTES } from "@/navigation";
import { useTranslation } from "react-i18next";
import { useTheme } from "styled-components/native";
import { useAppDispatch } from "@/store";
export function useApp() {
  const navigation = useAppNavigation();
  const { t } = useTranslation();
  const theme = useTheme();
  const route = useAppRoute();
  const dispatch = useAppDispatch();
  return { navigation, route, ROUTES, t, theme, dispatch };
}
