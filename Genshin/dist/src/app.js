"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const conf_1 = require("./conf");
const rumia_1 = require("rumia");
const core_1 = require("@genshin-kit/core");
const { CharactersFilter } = require("genshin-kit").util;
const App = new core_1.GenshinKit();
App.loginWithCookie("cookie_token=CNVWm7Hl4zPtgSMq63W4AMGyXzlCKUV1H9JcaimH; account_id=347820053; ltoken=olK01rTY09iO96fnX60sRFnSZ7uyJraBzslLkEPa; ltuid=347820053");
App.getAllCharacters(250192694).then((data) => {
    const Filter = new CharactersFilter(data);
}, console.error);
let uid = /\d{9}/;
const bot = new rumia_1.OneBot_WebSocket({
    url: "ws://127.0.0.1:23001",
    maxRetries: 3,
});
bot.BotEvent.on("group_message", async (msg) => {
    if (conf_1.date.get(msg.sender.nickname, null) !== msg.sender.nickname) {
        bot.send_group_msg({
            group_id: msg.group_id,
            message: "请输入uid<uid>",
            auto_escape: true,
        });
        if (uid.test(msg.message.toString()) === true) {
            const str = msg.message.toString();
            const uidRegex = /\d{9}/;
            const match = uidRegex.exec(str);
            const uids = match ? match[0] : null;
            console.log(uids);
            conf_1.date.init(`${msg.sender.nickname}`, {
                qq: msg.sender.user_id,
                uid: uids,
            });
        }
    }
    else {
    }
});
