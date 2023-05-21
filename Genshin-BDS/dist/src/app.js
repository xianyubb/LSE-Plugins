"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const api_1 = require("./api");
let uid = /^uid(\s*)\d{9}$/;
mc.listen("onServerStarted", () => {
    const ys = mc.newCommand("ys", "运势原神查询", PermType.Any, 0x80);
    ys.setEnum("cx", ["ys", "uid"]);
    ys.mandatory("cx", ParamType.Enum, "cx", 1);
    ys.overload(["cx"]);
    ys.setCallback((_cmd, _ori, out, res) => {
        switch (res.cx) {
            case "ys":
                _ori.player?.tell((0, api_1.todayFortune)(Number(_ori.player?.xuid)));
                break;
            case "uid":
                break;
        }
    });
    ys.setup();
});
