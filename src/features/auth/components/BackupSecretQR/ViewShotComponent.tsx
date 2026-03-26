import styled from "styled-components/native";
import { Ref } from "react";
import ViewShot from "react-native-view-shot";
import { Typography } from "@/components";
import { useBackupSecretQR } from "../../hooks";

const QrContanier = styled.View`
  background-color: ${props => props.theme.colors.surfaceBg};
  align-self: stretch;
  height: ${props => props.theme.size.xxl}px;
  align-items: center;
  justify-content: center;
  gap: ${props => props.theme.spacing.step.xs}px;
`;

const TextContent = styled.View`
  align-items: center;
  gap: ${props => props.theme.spacing.step.xs}px;
`;

interface ViewShotProps {
  size: number;
  mnemonic: string;
  title: string;
  helper: string;
  color: string;
  viewShotRef: Ref<ViewShot>;
}
export const ViewShotComponent = (props: ViewShotProps) => {
  const { QRCode } = useBackupSecretQR();
  return (
    <ViewShot ref={props.viewShotRef} options={{ format: "jpg", quality: 1 }}>
      <QrContanier>
        <QRCode size={props.size} value={props.mnemonic} backgroundColor="transparent" />
        <TextContent>
          <Typography type="main" weight="bold">
            {props.title}
          </Typography>

          <Typography type="caption" color={props.color}>
            {props.helper}
          </Typography>
        </TextContent>
      </QrContanier>
    </ViewShot>
  );
};
