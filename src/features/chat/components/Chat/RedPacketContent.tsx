import { t } from "i18next";
import styled, { useTheme, css } from "styled-components/native";
import { Typography } from "@/components";
import { MessageStatus } from "@/constants";
import IconFont from "@/assets/font/iconfont";
import { useMessageStatus } from "../../utils";

const Container = styled.View`
  flex-direction: column;
  width: 100%;
`;

const StatusLine = styled.View`
  ${({ theme }) => {
    return css`
      align-self: flex-end;
      height: ${theme.typography.size.md}px;
      justify-content: center;
    `;
  }}
`;

interface Props {
  isMe: boolean;
  amount?: number;
  status: MessageStatus;
}

export function RedPacketContent({ isMe, amount, status }: Props) {
  const theme = useTheme();
  const iconConfig = useMessageStatus(status);
  return (
    <Container>
      <Typography color={theme.colors.baseInverse} weight="bold">
        {t("chat.red_packet_message", { amount: amount || 0, symbol: "USDC" })}
      </Typography>
      {isMe && (
        <StatusLine>
          <IconFont {...iconConfig} />
        </StatusLine>
      )}
    </Container>
  );
}
