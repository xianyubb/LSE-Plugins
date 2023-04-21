"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rumia_1 = require("rumia");
const bot = new rumia_1.OneBot_WebSocket({
    url: "ws://localhost:23001",
    maxRetries: 3,
});
bot.BotEvent.on("private_message", (msg) => {
    if (msg.raw_message.trim() === "") {
    }
});
