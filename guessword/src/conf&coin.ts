// LiteLoader-AIDS automatic generated
/// <reference path="c:\Users\Administrator\.vscode/dts/HelperLib-master/src/index.d.ts"/>

let conf = new JsonConfigFile("./plugins/GuessWord/config.json");
conf.init("llmoney", false);
conf.init("Score", "money");

export let llmoney: Boolean = conf.get("llmoney");
export let Score = conf.get("Score");

export function coin(pl: Player | undefined, coins: number) {
  if (Boolean(llmoney) === true) {
    money.add(String(pl?.xuid), coins);
  } else {
    mc.addPlayerScore(String(pl?.uuid),Score,coins)
  }
}
