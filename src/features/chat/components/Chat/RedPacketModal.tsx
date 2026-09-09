import styled, { css } from "styled-components/native";
import { Modal } from "react-native";
import { Button, Input, Typography } from "@/components";
import { t } from "i18next";
import { InputProps } from "../../store";

const Mask = styled.Pressable`
  flex: 1;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.45);
  padding: 24px;
`;

const Card = styled.Pressable`
  ${({ theme }) => css`
    background-color: ${theme.colors.base};
    border-radius: ${theme.radii.scale.lg}px;
    padding: ${theme.spacing.step.lg}px;
    gap: ${theme.spacing.step.md}px;
  `}
`;

interface Props {
  visible: boolean;
  amount: InputProps;
  balance?: number;
  onClose: () => void;
  onSend: () => void;
}

export function RedPacketModal({ visible, amount, balance = 0, onClose, onSend }: Props) {
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <Mask onPress={onClose}>
        <Card onPress={e => e.stopPropagation()}>
          <Typography type="heading" weight="bold">
            {t("chat.red_packet")}
          </Typography>
          <Typography type="caption" color="#64748B">
            {t("chat.wallet_balance", {
              balance: balance,
              symbol: "USDC",
            })}
          </Typography>
          <Input
            value={amount.value}
            onChangeText={amount.onChange}
            placeholder={t("chat.red_packet_placeholder")}
            keyboardType="decimal-pad"
            clear={!!amount.value}
          />
          <Button title={t("chat.send_red_packet")} onPress={onSend} />
          <Button title={t("common.cancel")} onPress={onClose} />
        </Card>
      </Mask>
    </Modal>
  );
}
