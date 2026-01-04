/**
 * @format
 */
import "react-native-get-random-values"; // 必须在第一行，为 ethers 提供随机数种子
import { Buffer } from "buffer";
import { AppRegistry } from "react-native";
import App from "./App";
import { name as appName } from "./app.json";
if (typeof global.Buffer === "undefined") {
  global.Buffer = Buffer;
}
AppRegistry.registerComponent(appName, () => App);
