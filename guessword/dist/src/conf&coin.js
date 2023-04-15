"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.coin = exports.Score = exports.llmoney = void 0;
let conf = new JsonConfigFile("./plugins/GuessWord/config.json");
conf.init("llmoney", false);
conf.init("Score", "money");
exports.llmoney = conf.get("llmoney");
exports.Score = conf.get("Score");
function coin(pl, coins) {
    if (Boolean(exports.llmoney) === true) {
        money.add(String(pl?.xuid), coins);
    }
    else {
        mc.addPlayerScore(String(pl?.uuid), exports.Score, coins);
    }
}
exports.coin = coin;
