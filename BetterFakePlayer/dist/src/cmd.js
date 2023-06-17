"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const api_1 = require("./api");
const fakeplayer = mc.newCommand("fakeplayer", "假人", PermType.Any, 0x80);
fakeplayer.setAlias("fp");
fakeplayer.mandatory("name", ParamType.String);
fakeplayer.mandatory("pos", ParamType.BlockPos);
fakeplayer.optional("times", ParamType.Int);
fakeplayer.mandatory("target", ParamType.Actor);
fakeplayer.setEnum("ispawn", ["spawn", "dispawn"]);
fakeplayer.mandatory("isspawn", ParamType.Enum, "ispawn", 1);
fakeplayer.overload(["name", "isspawn"]);
fakeplayer.setEnum("jump", ["jump"]);
fakeplayer.mandatory("jumps", ParamType.Enum, "jump", 1);
fakeplayer.overload(["name", "jumps", "times"]);
fakeplayer.setEnum("attack", ["attack"]);
fakeplayer.setEnum("repeat", ["repeat"]);
fakeplayer.mandatory("attacks", ParamType.Enum, "attack", 1);
fakeplayer.optional("repeats", ParamType.Enum, "repeat");
fakeplayer.optional("interval", ParamType.Int);
fakeplayer.overload([
    "name",
    "attacks",
    "target",
    "repeats",
    "interval",
    "times",
]);
fakeplayer.setEnum("lookat", ["lookat"]);
fakeplayer.mandatory("lookats", ParamType.Enum, "lookat", 1);
fakeplayer.overload(["name", "lookats", "pos"]);
fakeplayer.setEnum("destory", ["destory"]);
fakeplayer.mandatory("destorys", ParamType.Enum, "destory", 1);
fakeplayer.overload(["name", "destorys", "pos"]);
fakeplayer.setEnum("stopdestory", ["stopdestory"]);
fakeplayer.mandatory("stopdestorys", ParamType.Enum, "stopdestory", 1);
fakeplayer.overload(["name", "stopdestorys"]);
fakeplayer.setEnum("rot", ["rot"]);
fakeplayer.mandatory("rots", ParamType.Enum, "rot", 1);
fakeplayer.mandatory("rotint", ParamType.Int);
fakeplayer.overload(["name", "rots", "rotint"]);
fakeplayer.setCallback((_cmd, _ori, out, res) => {
    if (_ori.player && _ori.player.isOP()) {
        if ((0, api_1.cmd)(res)) {
            _ori.player.tell("假人正在执行中...");
        }
        else {
            _ori.player.tell(`未找到名为${res["name"]}的假人`);
            _ori.player.tell(`正在为您生成名为${res["name"]}的假人`);
            let sp = (0, api_1.spawnSimilatedPlayer)(_ori.player, res["name"], _ori.player.blockPos);
        }
    }
    else if (_ori.player) {
        if ((0, api_1.cmd)(res)) {
            _ori.player.tell("假人正在执行中...");
        }
        else {
            _ori.player.tell(`未找到名为${res["name"]}的假人`);
        }
    }
    else {
        if ((0, api_1.cmd)(res)) {
            log("假人正在执行中...");
        }
        else {
            log(`未找到名为${res["name"]}的假人`);
            log(`正在为您生成名为${res["name"]}的假人`);
            let sp = mc.spawnSimulatedPlayer(res["name"], 0, 0, 0, 0);
            log(`已在主世界0，0，0坐标生成创造假人`);
            if (sp)
                sp.setGameMode(1);
        }
    }
});
fakeplayer.setup();
