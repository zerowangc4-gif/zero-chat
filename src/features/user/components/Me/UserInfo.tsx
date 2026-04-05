import styled, { css, useTheme } from "styled-components/native";
import { Avatar, Typography } from "@/components";
import { useAppSelector } from "@/store";
import IconFont from "@/assets/font/iconfont";
import { Icon } from "@/constants";
const Container = styled.View`
  ${({ theme }) => {
    return css`
      flex-direction: row;
      padding-top: ${theme.size.xl}px;
      padding-left: ${theme.spacing.step.md}px;
      padding-right: ${theme.spacing.step.md}px;
      padding-bottom: ${theme.spacing.step.lg}px;
      background-color: ${theme.colors.base};
    `;
  }}
`;

const AvatarWrapper = styled.View`
  ${({ theme }) => {
    return css`
      padding-right: ${theme.spacing.step.md}px;
    `;
  }}
`;

const UserText = styled.View`
  ${({ theme }) => {
    return css`
      flex: 1;
      justify-content: center;
      gap: ${theme.spacing.step.md}px;
    `;
  }}
`;

const UserName = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;
const UserAdress = styled.Pressable`
  flex-direction: row;
  justify-content: space-between;
`;

interface Props {
  handleCopyAdress: () => void;
}
export const UserInfo = ({ handleCopyAdress }: Props) => {
  const theme = useTheme();
  const { user } = useAppSelector(state => state.chat);
  return (
    <Container>
      <AvatarWrapper>
        <Avatar avatarSeed={user.avatarSeed} size={theme.size.lg} />
      </AvatarWrapper>
      <UserText>
        <UserName>
          <Typography type="subheading" weight="bold">
            {user.username}
          </Typography>
          <IconFont name={Icon.QRCode} size={theme.typography.size.lg} color={theme.palette.brand} />
        </UserName>
        <UserAdress onPress={handleCopyAdress}>
          <Typography color={theme.colors.secondaryWord}>
            {user.address.slice(0, 8)}....{user.address.slice(34, 42)}
          </Typography>
          <IconFont name={Icon.go} size={theme.typography.size.md} color={theme.colors.secondaryWord} />
        </UserAdress>
      </UserText>
    </Container>
  );
};
