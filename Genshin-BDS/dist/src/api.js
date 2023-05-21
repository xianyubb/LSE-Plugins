"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.todayFortune = void 0;
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
exports.todayFortune = todayFortune;
