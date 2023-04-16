"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.coin = exports.op_id = exports.Score = exports.llmoney = void 0;
let conf = new JsonConfigFile("./plugins/GuessWord/config.json");
conf.init("llmoney", false);
conf.init("Score", "money");
conf.init("op_id", 2149656630);
exports.llmoney = conf.get("llmoney");
exports.Score = conf.get("Score");
exports.op_id = conf.get("op_id");
function coin(pl, coins) {
    if (Boolean(exports.llmoney) === true) {
        money.add(String(pl?.xuid), coins);
    }
    else {
        mc.addPlayerScore(String(pl?.uuid), exports.Score, coins);
    }
}
exports.coin = coin;
