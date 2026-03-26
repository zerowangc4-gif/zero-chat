import styled from "styled-components/native";
import { Button } from "@/components";

const FooterContainer = styled.View`
  position: absolute;
  bottom: ${props => props.theme.spacing.layout.ActionButtonToBottom}px;
  left: ${props => props.theme.spacing.step.xl}px;
  right: ${props => props.theme.spacing.step.xl}px;
  gap: ${props => props.theme.spacing.step.md}px;
`;
interface ButtonAction {
  title: string;
  disabled?: boolean;
  loading?: boolean;
  bgColor?: string;
  textColor?: string;
  onPress: () => void;
}
export const Footer = ({ data }: { data: ButtonAction[] }) => {
  return (
    <FooterContainer>
      {data.map((item: ButtonAction) => {
        return (
          <Button
            key={item.title}
            size="lg"
            title={item.title}
            loading={!!item.loading}
            disabled={!!item.disabled}
            bgColor={item.bgColor}
            textColor={item.textColor}
            onPress={item.onPress}
          />
        );
      })}
    </FooterContainer>
  );
};
