/// <reference path="SereinJSPluginHelper.js"/>

serein.registerPlugin('yunshi', 'v1.0', 'xianyubb and 饼干', '运势插件');

/**
 * @typedef {Object} FortuneData
 * @property {number} date
 * @property {number} workFortune
 * @property {number} loveFortune
 * @property {number} moneyFortune
 */
/** @type {{[user: string]: FortuneData}} */
const fortuneData = {};

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

function todayFortune(user) {
  let fortune = fortuneData[user];
  if (!fortune || fortune.date !== getExtractedDate()) {
    fortune = roundFortune();
    fortuneData[user] = fortune;
  }

  const { workFortune, loveFortune, moneyFortune } = fortune;
  return (
    `[CQ:at,qq=${user}]\n`+
    `以下是您今日的运势\n` +
    `事业运:${workFortune}\n` +
    `桃花运:${loveFortune}\n` +
    `财运:${moneyFortune}\n`+
    `每日运势不能更改哦~`
  );
}

serein.setListener(
  'onReceiveGroupMessage',
  /**
   * @param {number} group
   * @param {number} user
   * @param {string} msg
   */
  (group, user, msg) => {
    if (msg.trim() === '运势') {
      serein.sendGroup(group, todayFortune(user));
    }
  }
);
