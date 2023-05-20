// LiteLoader-AIDS automatic generated
/// <reference path="c:\Users\Administrator\.vscode/dts/HelperLib-master/src/index.d.ts"/>

import { config, date } from "./conf";

import { GenshinKit, util } from "@genshin-kit/core";

export const App = new GenshinKit();
export let cookie = App.loginWithCookie(config.get("cookie"));

let uid = /^uid(\s*)\d{9}$/;

mc.listen("onServerStarted",()=>{
  const ys= mc.newCommand("ys","运势原神查询",PermType.Any,0x80)
  ys.

})

bot.BotEvent.on("group_message", async (msg) => {
  if (msg.message === "ys") {
    if (!date.get(msg.sender.nickname, null)) {
      pl.send_group_msg({
        group_id: msg.group_id,
        message: "请输入uid<uid>",
        auto_escape: true,
      });
    } else {
      let userinfo: any = await App.getUserInfo(
        Number(date.get(msg.sender.nickname)["uid"])
      );
      let spa = await App.getSpiralAbyss(
        Number(date.get(msg.sender.nickname)["uid"]),
        1
      );
      let nickname, level;
      if (userinfo.role) {
        nickname = userinfo.role["nickname"];
        level = userinfo.role["level"];
      }
      bot.send_group_msg({
        group_id: msg.group_id,
        message: "正在查询",
        auto_escape: true,
      });

      bot.send_group_msg({
        group_id: msg.group_id,
        message: `你的昵称:${nickname}\n你的等级:${level}\n深渊:${spa.max_floor}`,
        auto_escape: true,
      });
    }
  }
});

bot.BotEvent.on(
  "group_message",
  (msg: {
    group_id: number;
    message: { toString: () => string };
    sender: { nickname: any; user_id: any };
  }) => {
    const str = msg.message.toString();
    const match = str.match(uid); // 匹配
    let num;
    if (match) {
      num = match[0].replace("uid", "");
    }
    if (uid.test(msg.message.toString()) == true) {
      if (util.isValidCnUid(num) === true) {
        date.set(`${msg.sender.nickname}`, {
          qq: msg.sender.user_id,
          uid: Number(num),
        });
        if (Number(num) === date.get(msg.sender.nickname)["uid"]) {
          bot.send_group_msg({
            group_id: msg.group_id,
            message: "你已经绑定uid了，输入ys即可查询",
            auto_escape: true,
          });
        } else {
          bot.send_group_msg({
            group_id: msg.group_id,
            message: "绑定成功，输入ys即可查询",
            auto_escape: true,
          });
        }
      } else {
        bot.send_group_msg({
          group_id: msg.group_id,
          message: "请输入正确uid",
          auto_escape: true,
        });
      }
    }
  }
);

/**
 * @typedef {Object} FortuneData
 * @property {number} date
 * @property {number} workFortune
 * @property {number} loveFortune
 * @property {number} moneyFortune
 */
/** @type {{[user: string]: FortuneData}} */
const fortuneData: any = {};

/**
 * @param {number} max
 * @returns {number}
 */
function getRandomNum(max = 100) {
  return Math.round(Math.random() * max);
}

/**
 * @returns {number}
 */
function getExtractedDate() {
  const date = new Date();
  date.setHours(0, 0, 0, 0);
  return date.getTime();
}

/**
 * @returns {FortuneData}
 */
function roundFortune() {
  return {
    date: getExtractedDate(),
    workFortune: getRandomNum(),
    loveFortune: getRandomNum(),
    moneyFortune: getRandomNum(),
  };
}

function todayFortune(user: number) {
  let fortune = fortuneData[user];
  if (!fortune || fortune.date !== getExtractedDate()) {
    fortune = roundFortune();
    fortuneData[user] = fortune;
  }

  const { workFortune, loveFortune, moneyFortune } = fortune;
  return (
    `以下是您今日的运势\n` +
    `事业运:${workFortune}\n` +
    `桃花运:${loveFortune}\n` +
    `财运:${moneyFortune}\n` +
    `每日运势不能更改哦~`
  );
}

bot.BotEvent.on(
  "group_message",
  (msg: {
    raw_message: string;
    group_id: any;
    sender: { user_id: number };
  }) => {
    if (msg.raw_message === "运势") {
      bot.send_group_msg({
        group_id: msg.group_id,
        message: todayFortune(msg.sender.user_id),
        auto_escape: true,
      });
    }
  }
);
