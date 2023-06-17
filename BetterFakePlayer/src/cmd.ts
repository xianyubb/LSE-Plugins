import { cmd, spawnSimilatedPlayer } from "./api";

const fakeplayer = mc.newCommand("fakeplayer", "假人", PermType.Any, 0x80);
//命令别名
fakeplayer.setAlias("fp");
//main
fakeplayer.mandatory("name", ParamType.String);
fakeplayer.mandatory("pos", ParamType.BlockPos);
fakeplayer.optional("times", ParamType.Int);
fakeplayer.mandatory("target", ParamType.Actor);
//注册生成假人命令
fakeplayer.setEnum("ispawn", ["spawn", "dispawn"]);
fakeplayer.mandatory("isspawn", ParamType.Enum, "ispawn", 1);
fakeplayer.overload(["name", "isspawn"]);
//注册假人跳跃命令
fakeplayer.setEnum("jump", ["jump"]);
fakeplayer.mandatory("jumps", ParamType.Enum, "jump", 1);
fakeplayer.overload(["name", "jumps", "times"]);
//注册假人攻击命令
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
//注册假人看向某个位置命令
fakeplayer.setEnum("lookat", ["lookat"]);
fakeplayer.mandatory("lookats", ParamType.Enum, "lookat", 1);
fakeplayer.overload(["name", "lookats", "pos"]);
//注册假人破坏方块命令
fakeplayer.setEnum("destory", ["destory"]);
fakeplayer.mandatory("destorys", ParamType.Enum, "destory", 1);
fakeplayer.overload(["name", "destorys", "pos"]);
//注册假人停止破坏方块指令
fakeplayer.setEnum("stopdestory", ["stopdestory"]);
fakeplayer.mandatory("stopdestorys", ParamType.Enum, "stopdestory", 1);
fakeplayer.overload(["name", "stopdestorys"]);
//注册设置假人身体角度命令
fakeplayer.setEnum("rot", ["rot"]);
fakeplayer.mandatory("rots", ParamType.Enum, "rot", 1);
fakeplayer.mandatory("rotint", ParamType.Int);
fakeplayer.overload(["name", "rots", "rotint"]);
//注册假人断开连接命令
fakeplayer.setEnum("disconnect", ["disconnect"])
fakeplayer.mandatory("disconnects", ParamType.Enum, "disconnect", 1)
fakeplayer.overload(["name","disconnects"])
//命令回调
fakeplayer.setCallback((_cmd, _ori, out, res) => {
  if (_ori.player && _ori.player.isOP()) {
    if (cmd(res)) {
      _ori.player.tell("假人正在执行中...");
    } else {
      _ori.player.tell(`未找到名为${res["name"]}的假人`);
      _ori.player.tell(`正在为您生成名为${res["name"]}的假人`);
      let sp = spawnSimilatedPlayer(
        _ori.player,
        res["name"],
        _ori.player.blockPos
      );
    }
    //当命令执行者是OP玩家时
  } else if (_ori.player) {
    if (cmd(res)) {
      _ori.player.tell("假人正在执行中...");
    } else {
      _ori.player.tell(`未找到名为${res["name"]}的假人`);
    }
    //当命令执行者是普通玩家是
  } else {
    if (cmd(res)) {
      log("假人正在执行中...");
    } else {
      log(`未找到名为${res["name"]}的假人`);
      log(`正在为您生成名为${res["name"]}的假人`);
      let sp = mc.spawnSimulatedPlayer(res["name"], 0, 0, 0, 0);
      log(`已在主世界0，0，0坐标生成创造假人`);
      if (sp) sp.setGameMode(1);
    }
    //当命令执行者非玩家时
  }
});
//安装命令
fakeplayer.setup();
