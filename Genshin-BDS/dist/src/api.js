"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cookie = exports.App = exports.todayFortune = void 0;
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
  return (
    `以下是您今日的运势\n` +
    `事业运:${workFortune}\n` +
    `桃花运:${loveFortune}\n` +
    `财运:${moneyFortune}\n` +
    `每日运势不能更改哦~`
  );
}
exports.todayFortune = todayFortune;
const core_1 = require("@genshin-kit/core");
const conf_1 = require("./conf");
exports.App = new core_1.GenshinKit();
exports.cookie = exports.App.loginWithCookie(conf_1.config.get("cookie"));
function isdata(pl) {
  if (conf_1.date.get(pl.xuid) !== null) {
    return true;
  } else return false;
}
function isuid(pl) {
  if (isdata(pl) === true) {
    return core_1.util.isValidCnUid(conf_1.date.get(pl.xuid));
  } else return false;
}
