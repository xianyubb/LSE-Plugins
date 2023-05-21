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
import e from "express";

export const App = new GenshinKit();
export let cookie = App.loginWithCookie(config.get("cookie"));

//检测数据文件内是否存在文件信息
function isdata(pl: Player): boolean {
  return date.get(pl.xuid) !== null;
}
//检测玩家输入uid是否正确
function isUID(pl: Player) {
  const xuid = date.get(pl.xuid);
  return isdata(pl) && util.isValidCnUid(xuid);
}

//调用查询api
function CXUID(pl: Player) {
  let xuid = date.get(pl.xuid);
  App.getUserInfo(xuid).then((data) => {
    return data;
  });
}

//uid查询表单
function fm(pl: Player) {
  const uid = mc.newSimpleForm();
  uid.setTitle("UIDSetting");
  uid.addInput("请输入你要查询的uid", "(Number)");
  pl.sendForm(fm, (pl, data) => {});
}
