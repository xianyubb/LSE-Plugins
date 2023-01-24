//LiteLoaderScript Dev Helper
/// <reference path="c:\Users\Administrator\.vscode/dts/HelperLib-master/src/index.d.ts"/>

ll.registerPlugin(
  /* name */ "StopServer",
  /* introduction */ "一个简单的OP服内关服",
  /* version */ [0, 0, 1],
  /* otherInformation */ {}
);

//stopserver是否加载
log("StopServer加载成功");
//真命令注册版本(尝试）
mc.listen("onServerStarted", () => {
  const cmd = mc.newCommand("stops", "关闭服务器", PermType.GameMasters, 0x80);
  cmd.setEnum("stopserver", ["true", "false"]);
  cmd.mandatory("action", ParamType.Bool, "stopserver", 1);
  cmd.overload(["stopserver"]);
  cmd.setCallback((_cmd, _ori, out, res) => {
    switch (res.stopserver) {
      case "true":
        return out.success(`关服成功`);
      case "false":
        return out.success("关服已取消/help ");
    }
  });
  cmd.setup();
});
mc.listen("onPlayerCmd", (pl, cmd) => {
  if (cmd === "stops true") {
    mc.broadcast("[§4§lWARNING§r]§6服务器将在10秒后关闭");
    setTimeout(() => {
      pl.tell("§4§l服务器已关闭");
      mc.runcmd("stop");
    }, 10000);
  }
  if (cmd === "stops false") {
    pl.tell("[§6§l提示§r]§l§e关服已取消");
  }
});
