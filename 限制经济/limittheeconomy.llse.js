// LiteLoader-AIDS automatic generated
/// <reference path="c:\Users\Administrator\.vscode/dts/HelperLib-master/src/index.d.ts"/>

ll.registerPlugin(
  /* name */ "limit the economy",
  /* introduction */ "限制经济",
  /* version */ [0, 0, 1],
  /* otherInformation */ {
    author: "xianyubb",
    qq: "2149656630",
  }
);

const Config = new JsonConfigFile("./plugins//limittheeconomy//config.json");

Config.init("type", "llmoney");
let type = Config.get("type");
Config.init("ScoreName", "money");
let ScoreName = Config.get("ScoreName");
Config.init("limit", 114514);
let limit = Config.get("limit");

/**
 * 使用llmoney
 * @param {string} xuid 玩家对象
 * @param {number} money 经济
 */
function llmoney(xuid, money) {
  if (money > limit) {
    money.set(xuid, limit);
    Player.tell("你的经济已经超过了该服务器设置的最大经济数");
    Player.tell(`已为您自动降到${limit},多的钱概不退还`);
  }
}
/**
 * 使用计分板
 * @param {Player} Player 玩家对象
 * @param {number} money 经济
 */
function Score(Player, money) {
  if (money > limit) {
    Player.setScore(ScoreName, limit);
    Player.tell("你的经济已经超过了该服务器设置的最大经济数");
    Player.tell(`已为您自动降到${limit},多的钱概不退还`);
  }
}

mc.listen("onJoin", (Player) => {
  let money = money.get(Player.xuid);
  if (type === "llmoney") {
    llmoney(Player.xuid, money);
  } else if (type === "Score") {
    let money = Player.getScore(ScoreName);
    Score(Player, money);
  }
});

mc.listen("onScoreChanged", (Player, num, name, disname) => {
  if (ScoreName === name || disname) {
    Score(Player, num);
  }
});

mc.listen("onMoneyAdd", (xuid, mon) => {
  let money = money.get(xuid) + mon;
  llmoney(xuid, money);
});
