"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dataPath = void 0;
const rumia_1 = require("rumia");
const core_1 = require("@genshin-kit/core");
const fs_1 = require("fs");
const path_1 = require("path");
const App = new core_1.GenshinKit();
const bot = new rumia_1.OneBot_WebSocket({
    url: "ws://localhost:23001",
    maxRetries: 3,
});
let buf = Buffer.alloc(1024);
let uid = /\d{9}/;
let hh = 123456789;
console.log(uid.test("uid123456789"));
let PluginConfig = [];
exports.dataPath = (0, path_1.join)("./config", "Genshin");
if (!(0, fs_1.existsSync)(exports.dataPath))
    (0, fs_1.mkdirSync)(exports.dataPath);
function LoadConfig() {
    if (!(0, fs_1.existsSync)("./config/Genshin/config.json")) {
        (0, fs_1.writeFile)("./config/Genshin/config.json", JSON.stringify(PluginConfig), (err) => { });
    }
}
LoadConfig();
bot.BotEvent.on("group_message", async (msg) => {
    if (msg.raw_message === "ys") {
        (0, fs_1.open)("./config/Genshin/config.json", "r+", function (err, fd) {
            if (err) {
                return console.error(err);
            }
            (0, fs_1.read)(fd, buf, 0, buf.length, 0, async function (err, bytes) {
                if (err) {
                    console.log(err);
                }
                if (bytes > 0) {
                    let a = buf.slice(0, bytes).toString();
                    let b = JSON.parse(a);
                    if (msg.sender.user_id != b[msg.sender.nickname]["qq"]) {
                        bot.send_group_msg({
                            group_id: msg.group_id,
                            message: "请输入uid<uid>",
                            auto_escape: true,
                        });
                    }
                    else {
                        App.loginWithCookie("cookie_token=CNVWm7Hl4zPtgSMq63W4AMGyXzlCKUV1H9JcaimH; account_id=347820053; ltoken=olK01rTY09iO96fnX60sRFnSZ7uyJraBzslLkEPa; ltuid=347820053");
                        let userinfo = await App.getUserInfo(b[msg.sender.nickname]["uid"]);
                        if (userinfo.role) {
                        }
                    }
                }
            });
        });
    }
});
bot.BotEvent.on("group_message", (msg) => {
    PluginConfig.push();
    (0, fs_1.writeFile)("./config/Genshin/config.json", "\n" + JSON.stringify(PluginConfig), (err) => { });
});
