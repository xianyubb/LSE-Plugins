// LiteLoader-AIDS automatic generated
/// <reference path="c:\Users\Administrator\.vscode/dts/HelperLib-master/src/index.d.ts"/> 







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
