// LiteLoader-AIDS automatic generated
/// <reference path="c:\Users\Administrator\.vscode/dts/HelperLib-master/src/index.d.ts"/>

let conf = new JsonConfigFile("./plugins/GuessWord/config.json");
conf.init("llmoney", false);
conf.init("Score", "money");
conf.init("op_id", 2149656630);

export let llmoney: Boolean = conf.get("llmoney");
export let Score = conf.get("Score");
export let op_id = conf.get("op_id");

export function coin(pl: Player | undefined, coins: number) {
  if (Boolean(llmoney) === true) {
    money.add(String(pl?.xuid), coins);
  } else {
    mc.addPlayerScore(String(pl?.uuid), Score, coins);
  }
}
