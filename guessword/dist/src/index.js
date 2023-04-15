"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.coins = exports.Qu = void 0;
require("./conf&coin");
const const_1 = require("./const");
const forms_1 = require("./forms");
logger.setTitle(const_1.PLUGIN_NAME + "已加载");
ll.registerPlugin(const_1.PLUGIN_NAME, const_1.PLUGIN_DESCRIPTION, const_1.PLUGIN_VERSION, const_1.PLUGIN_EXTRA);
mc.listen("onServerStarted", () => {
    const gw = mc.newCommand("gwessword", "猜词表单", PermType.Any, 0x80);
    gw.setAlias("gw");
    gw.setEnum("action", ["main", "cs"]);
    gw.mandatory("main", ParamType.Enum, "action");
    gw.overload(["main"]);
    gw.setCallback((_cmd, _ori, out, res) => {
        switch (res.main) {
            case "main":
                (0, forms_1.main)(_ori.player);
                break;
            case "cs":
                if (_ori.player?.isOP() === true) {
                }
                break;
        }
    });
    gw.setup();
});
exports.Qu = "hhh", exports.coins = 666;
