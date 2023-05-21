"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cookie = exports.App = void 0;
const conf_1 = require("./conf");
const core_1 = require("@genshin-kit/core");
const api_1 = require("./api");
exports.App = new core_1.GenshinKit();
exports.cookie = exports.App.loginWithCookie(conf_1.config.get("cookie"));
let uid = /^uid(\s*)\d{9}$/;
mc.listen("onServerStarted", () => {
    const ys = mc.newCommand("ys", "运势原神查询", PermType.Any, 0x80);
    ys.setEnum("cx", ["ys", "uid"]);
    ys.mandatory("cx", ParamType.Enum, "cx");
    ys.overload(["cx"]);
    ys.setCallback((_cmd, _ori, out, res) => {
        let pl = _ori.player;
        switch (res) {
            case "ys":
                pl?.tell((0, api_1.todayFortune)(Number(pl.uuid)));
                break;
            case "uid":
                break;
        }
    });
    ys.setup();
});
