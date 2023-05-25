// LiteLoader-AIDS automatic generated
/// <reference path="c:\Users\Administrator\.vscode/dts/helperlib/src/index.d.ts"/>

//运势api
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

export function todayFortune(user: number) {
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

//原神查询api

import { GenshinKit, util } from "@genshin-kit/core";
import { config, date } from "./conf";

export const App = new GenshinKit();
export let cookie = App.loginWithCookie(config.get("cookie"));

//检测数据文件内是否存在玩家信息
export function isdata(pl: Player) {
  let xuid = date.get(pl.name, null);
  if (xuid != null && xuid["xuid"] == Number(pl.xuid)) {
    return true;
  } else {
    return false;
  }
}
//检测玩家输入uid是否正确
function isUID(data: number) {
  return util.isValidCnUid(data);
}

//调用查询api
export function CXUID(pl: Player) {
  let uid = date.get(pl.name)["uid"];
  pl.tell("正在为您查询");
  App.getUserInfo(uid).then(
    (data) => {
      pl.tell("获取成功");
    },
    (reason) => {
      pl.tell("获取失败");
    }
  );
}

//uid查询表单
export function fm(pl: Player) {
  const uid = mc.newCustomForm();
  uid.setTitle("UIDSetting");
  uid.addInput("请输入你要查询的uid", "(Number)");
  pl?.sendForm(uid, (pl: Player, data) => {
    switch (typeof data) {
      case null:
        // 执行data为null时的代码块
        pl.tell("玩家关闭了表单");
        break;
      case "object":
        if (Array.isArray(data)) {
          // 执行data为数组时的代码块
          if (isUID(data[0])) {
            date.set(`${pl.name}`, {
              xuid: Number(pl.xuid),
              uid: JSON.parse(data[0]),
            });
            CXUID(pl);
          } else {
            pl.tell("请输入正确的uid");
          }
        }
        break;
    }
    // switch (data) {
    //   case null:
    //     pl.tell("玩家关闭了表单");
    //     break;
    //   case Array.isArray(data) :
    //     if (isUID(data[0])) {
    //       date.set(`${pl.name}`, {
    //         xuid: Number(pl.xuid),
    //         uid: JSON.parse(data[0]),
    //       });
    //       CXUID(pl);
    //     } else {
    //       pl.tell("请输入正确的uid");
    //     }

    //     break;
    // }
  });
}
