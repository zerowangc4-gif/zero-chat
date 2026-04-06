import { IconNames } from "@/assets/font/iconfont";

type IconName =
  | "brand"
  | "showPassword"
  | "hidePassword"
  | "chat"
  | "me"
  | "add"
  | "back"
  | "check"
  | "chatAdd"
  | "send"
  | "meme"
  | "voice"
  | "search"
  | "QRCode"
  | "go"
  | "clear"
  | "scan";

export const Icon: Record<IconName, IconNames> = {
  brand: "daoban-copy",
  showPassword: "icon-eye-open-copy",
  hidePassword: "icon-eye-close-copy",
  chat: "gl-bubble",
  me: "wode",
  add: "jiahao_o",
  chatAdd: "zengjiatianjiajiahao",
  back: "xiangzuojiantou",
  check: "sangedian",
  send: "fasongxiaoxi",
  meme: "xiaolian",
  voice: "shengyin",
  search: "sousuo1",
  QRCode: "erweima",
  go: "youjiantou",
  clear: "qingchu",
  scan: "saoyisao",
};
