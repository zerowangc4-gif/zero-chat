import { t } from "i18next";
import styled, { useTheme, css } from "styled-components/native";
import { Typography } from "@/components";
import { MessageStatus } from "@/constants";
import IconFont from "@/assets/font/iconfont";
import { useMessageStatus } from "../../utils";

const Container = styled.Pressable`
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
  id: string;
  name: string;
  status: MessageStatus;
  handleGroupLink: (id: string) => () => void;
}

export function InviteMessageContent({ isMe, name, id, status, handleGroupLink }: Props) {
  const theme = useTheme();
  const iconConfig = useMessageStatus(status);
  return (
    <Container onPress={handleGroupLink(id)}>
      <Typography color={theme.palette.link} weight="bold">
        {t("chat.invite_text", { groupName: name })}
      </Typography>
      {isMe && (
        <StatusLine>
          <IconFont {...iconConfig} />
        </StatusLine>
      )}
    </Container>
  );
}
