"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bot = exports.cookie = exports.App = void 0;
const conf_1 = require("./conf");
const rumia_1 = require("rumia");
const core_1 = require("@genshin-kit/core");
exports.App = new core_1.GenshinKit();
exports.cookie = exports.App.loginWithCookie(conf_1.config.get("cookie"));
let uid = /^uid(\s*)\d{9}$/;
exports.bot = new rumia_1.OneBot_WebSocket({
    url: conf_1.config.get("ws"),
    maxRetries: 3,
});
exports.bot.BotEvent.on("group_message", async (msg) => {
    if (msg.message === "ys") {
        if (!conf_1.date.get(msg.sender.nickname, null)) {
            exports.bot.send_group_msg({
                group_id: msg.group_id,
                message: "请输入uid<uid>",
                auto_escape: true,
            });
        }
        else {
            let userinfo = await exports.App.getUserInfo(Number(conf_1.date.get(msg.sender.nickname)["uid"]));
            let spa = await exports.App.getSpiralAbyss(Number(conf_1.date.get(msg.sender.nickname)["uid"]), 1);
            let nickname, level;
            if (userinfo.role) {
                nickname = userinfo.role["nickname"];
                level = userinfo.role["level"];
            }
            exports.bot.send_group_msg({
                group_id: msg.group_id,
                message: "正在查询",
                auto_escape: true,
            });
            exports.bot.send_group_msg({
                group_id: msg.group_id,
                message: `你的昵称:${nickname}\n你的等级:${level}\n深渊:${spa.max_floor}`,
                auto_escape: true,
            });
        }
    }
});
exports.bot.BotEvent.on("group_message", (msg) => {
    const str = msg.message.toString();
    const match = str.match(uid);
    let num;
    if (match) {
        num = match[0].replace("uid", "");
    }
    if (uid.test(msg.message.toString()) == true) {
        if (core_1.util.isValidCnUid(num) === true) {
            conf_1.date.set(`${msg.sender.nickname}`, {
                qq: msg.sender.user_id,
                uid: Number(num),
            });
            if (Number(num) === conf_1.date.get(msg.sender.nickname)["uid"]) {
                exports.bot.send_group_msg({
                    group_id: msg.group_id,
                    message: "你已经绑定uid了，输入ys即可查询",
                    auto_escape: true,
                });
            }
            else {
                exports.bot.send_group_msg({
                    group_id: msg.group_id,
                    message: "绑定成功，输入ys即可查询",
                    auto_escape: true,
                });
            }
        }
        else {
            exports.bot.send_group_msg({
                group_id: msg.group_id,
                message: "请输入正确uid",
                auto_escape: true,
            });
        }
    }
});
const fortuneData = {};
function getRandomNum(max = 100) {
    return Math.round(Math.random() * max);
}
function getExtractedDate() {
    const date = new Date();
    date.setHours(0, 0, 0, 0);
    return date.getTime();
}
function roundFortune() {
    return {
        date: getExtractedDate(),
        workFortune: getRandomNum(),
        loveFortune: getRandomNum(),
        moneyFortune: getRandomNum(),
    };
}
function todayFortune(user) {
    let fortune = fortuneData[user];
    if (!fortune || fortune.date !== getExtractedDate()) {
        fortune = roundFortune();
        fortuneData[user] = fortune;
    }
    const { workFortune, loveFortune, moneyFortune } = fortune;
    return (`以下是您今日的运势\n` +
        `事业运:${workFortune}\n` +
        `桃花运:${loveFortune}\n` +
        `财运:${moneyFortune}\n` +
        `每日运势不能更改哦~`);
}
exports.bot.BotEvent.on("group_message", (msg) => {
    if (msg.raw_message === "运势") {
        exports.bot.send_group_msg({
            group_id: msg.group_id,
            message: todayFortune(msg.sender.user_id),
            auto_escape: true,
        });
    }
});
