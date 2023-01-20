//LiteLoaderScript Dev Helper
/// <reference path="c:\Users\Administrator\.vscode/dts/llaids/src/index.d.ts"/>

ll.registerPlugin(
  /* name */ "paolu",
  /* introduction */ "一个简用的跑路插件",
  /* version */ [0, 0, 1],
  /* otherInformation */ {}
);

// 插件是否加载成功
log("paolu加载成功");

//自动关服(60s)
mc.listen("onServerStarted", () => {
  setTimeout(() => {
    mc.broadcast("关服跑路");
    mc.runcmd("stop");
  }, 60000); //这里的数字可以更改，越小越快（单位：ms）
});

//向玩家发送虚假消息
let a = 0,
  b = 0; //声明ab变量,用作后面随机数
mc.listen("onJoin", (pl) => {
  setInterval(() => {
    a = Math.floor(Math.random() * 3);
    b = Math.floor(Math.random() * 2); //随机数
    pl.tell("[§4§l黑客§r]§6垃圾服务器等死吧"); //下面三排括号里面可自行更改
    pl.tell("[§4§l黑客§r]§560秒干趴你们服务器");
    pl.tell("[§4§l黑客§r]§3看我让你们体验一下什么叫做魔幻");
    pl.setGameMode(a); //这里就用到了变量ab
    pl.setPermLevel(b);
    //pl.crash(); //可以选择是否开启删去pl前面的//即可
  }, 500); //这里的数字可以更改，越小越快（单位：ms）
});

//破坏服务器（目前没想好怎么写哈哈）
