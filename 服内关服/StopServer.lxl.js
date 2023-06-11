//LiteLoaderScript Dev Helper
/// <reference path="c:\Users\Administrator\.vscode/dts/HelperLib-master/src/index.d.ts"/>

ll.registerPlugin(
  /* name */ "StopServer",
  /* introduction */ "更加易用的线上表单关服插件",
  /* version */ [0, 0, 1],
  /* otherInformation */ {}
);

//插件加载成功提示
log("StopServer加载成功");

//注册命令stops
mc.listen("onServerStarted", () => {
  const cmd = mc.newCommand("stops", "打开表单", PermType.Any, 0x80);
  cmd.overload([]);
  cmd.setCallback((_cmd, _ori, our, res) => {
    pl.sendModalForm(
      "线上关服[提示]",
      "§4真的要关闭服务器吗？",
      "确定",
      "放弃",
      function (pl, res) {
        if (res === true) {
          mc.broadcast("[§4§lWARNING§r]§6服务器将在10秒后关闭");
          setTimeout(() => {
            pl.tell("§4§l服务器已关闭");
            mc.runcmd("stop");
          }, 10000);
        } else {
          pl.tell("[§5§l提示§r]§9您已取消关闭服务器");
        }
      }
    );
  });
  cmd.setup();
});
