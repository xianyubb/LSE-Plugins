// LiteLoader-AIDS automatic generated
/// <reference path="c:\Users\Administrator\.vscode/dts/HelperLib-master/src/index.d.ts"/>

import { OneBot_WebSocket } from "rumia";
import { op_id } from "./conf&coin";
const bot = new OneBot_WebSocket({
  url: "ws://localhost:23001",
  maxRetries: 3,
});

bot.BotEvent.on("private_message", (msg) => {
  if (msg.raw_message.trim() === "重载") {
    mc.runcmdEx("ll reload guessword");
  }
});
