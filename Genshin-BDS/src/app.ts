// LiteLoader-AIDS automatic generated
/// <reference path="c:\Users\Administrator\.vscode/dts/HelperLib-master/src/index.d.ts"/>

import { config, date } from "./conf";

import { GenshinKit, util } from "@genshin-kit/core";
import { todayFortune } from "./api";
export const App = new GenshinKit();
export let cookie = App.loginWithCookie(config.get("cookie"));

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
        pl?.tell(todayFortune(Number(pl.uuid)));
        break;
      case "uid":
        break;
    }
  });
  ys.setup();
});
