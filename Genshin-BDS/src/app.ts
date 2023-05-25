// LiteLoader-AIDS automatic generated
/// <reference path="c:\Users\Administrator\.vscode/dts/helperlib/src/index.d.ts"/>

import { todayFortune, fm, isdata, CXUID } from "./api";

let uid = /^uid(\s*)\d{9}$/;


mc.listen("onServerStarted", () => {
  const ys = mc.newCommand("ys", "运势原神查询", PermType.Any, 0x80);
  ys.setEnum("cx", ["ys", "uid"]);
  ys.mandatory("cx", ParamType.Enum, "cx", 1);
  ys.overload(["cx"]);
  ys.setCallback((_cmd, _ori, out, res) => {
    switch (res.cx) {
      case "ys":
        _ori.player?.tell(todayFortune(Number(_ori.player?.xuid)));
        break;
      case "uid":
        if (_ori.player !== undefined) {
          if (isdata(_ori.player) === true) {
            CXUID(_ori.player);
          } else {
            fm(_ori.player);
          }
        } else {
          out.error("只有玩家才能使用这条命令哦！");
        }
        break;
    }
  });
  ys.setup();
});
