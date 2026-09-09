import { BaseScreen, Header, Main, Portal, InfoRow, Typography } from "@/components";
import { UserInfo, MeRightAction, MeMenu } from "../components";
import { useMe } from "../hooks";
import { t } from "i18next";
import styled, { css, useTheme } from "styled-components/native";
import { BASE_CHAIN } from "@/constants";

const Section = styled.View`
  ${({ theme }) => css`
    margin-top: ${theme.spacing.step.sm}px;
    background-color: ${theme.colors.base};
  `}
`;

const Hint = styled.View`
  ${({ theme }) => css`
    padding: ${theme.spacing.step.md}px;
  `}
`;

export function Me() {
  const theme = useTheme();
  const { handleShowMeMenu, isMenuVisible, menuItems, handleGoProfile, handleCopyAdress, wallet } = useMe();
  const symbol = wallet?.tokenSymbol || BASE_CHAIN.tokenSymbol;

  return (
    <BaseScreen>
      <Header
        leftElement={<UserInfo handleGoProfile={handleGoProfile} />}
        rightElement={<MeRightAction handleShowMeMenu={handleShowMeMenu} />}
      />
      <Main hasHeader={true}>
        {isMenuVisible && (
          <Portal id="me-menu">
            <MeMenu menuItems={menuItems} />
          </Portal>
        )}
        <Section>
          <InfoRow label={t("user.profile")} isLink onPress={handleGoProfile} />
          <InfoRow
            label={t("user.wallet_chain")}
            value={wallet?.chain || BASE_CHAIN.name}
            isLink={false}
          />
          <InfoRow
            label={t("user.wallet_balance")}
            value={`${wallet?.balance ?? 0} ${symbol}`}
            isLink={false}
            onPress={handleCopyAdress}
          />
          <InfoRow
            label={t("user.wallet_eth")}
            value={`${wallet?.ethBalance ?? 0} ${BASE_CHAIN.nativeSymbol}`}
            isLink={false}
          />
          <InfoRow
            label={t("user.wallet_earned")}
            value={`${wallet?.earned ?? 0} ${symbol}`}
            isLink={false}
          />
        </Section>
        <Hint>
          <Typography type="caption" color={theme.colors.secondaryWord}>
            {t("user.wallet_hint")}
          </Typography>
        </Hint>
      </Main>
    </BaseScreen>
  );
}
