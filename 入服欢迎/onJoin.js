//LiteLoaderScript Dev Helper
/// <reference path="c:\Users\Administrator\.vscode/dts/HelperLib-master/src/index.d.ts"/> 


ll.registerPlugin(
  /* name */ "onJoin",
  /* introduction */ "一个小小的入服欢迎提示",
  /* version */ [0, 0, 1],
  /* otherInformation */ {}
);

// 加载成功提示
log("onJoin加载成功");

// 入服欢迎聊天形式
mc.listen("onJoin", (pl) => {
  mc.broadcast("[§4系统提示§r]§4§l欢迎玩家§e[" + pl.name + "]§4进入服务器");
});

//入服欢迎标题形式
mc.listen("onJoin", (pl) => {
  pl.sendToast("§6§l入服欢迎", "§4§l欢迎玩家§e[" + pl.name + "]§4进入服务器");
});

// 入服欢迎title命令形式(暂时废弃)
mc.listen("onJoin", (pl) => {
  mc.runcmd(`title @a title §4欢迎玩家\n§e${pl.name}§3\n进入服务器`);
});