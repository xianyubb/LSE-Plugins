//LiteLoaderScript Dev Helper
/// <reference path="c:\Users\Administrator\.vscode/dts/HelperLib-master/src/index.d.ts"/>

ll.registerPlugin(
  /* name */ "transfer",
  /* introduction */ "传送到另一个服务器吧",
  /* version */ [0, 0, 1],
  /* otherInformation */ {}
);

// 插件加载成功提示
log("transfer加载成功");

mc.listen("onServerStarted", () => {
  //注册命令transfer
  const cmds = mc.newCommand("transfer", "打开传送表单", PermType.Any, 0x80);
  cmds.setEnum("action", ["action"]);
  cmds.optional("Player", ParamType.Player);
  cmds.overload(["Player"]);
  cmds.setCallback((_cmd, _ori, out, res) => {});
  cmds.setup();
});

let conf = new JsonConfigFile("./plugins/xianyubb/transfer/config.json");
conf.init("ServerName(1)", "服务器名称");
conf.init("image(1)", "");
conf.init("ServerIP(1)", "127.0.0.1");
conf.init("ServerPort(1)", 19132);
conf.init("ServerName(2)", "服务器名称");
conf.init("image(2)", "");
conf.init("ServerIP(2)", "127.0.0.1");
conf.init("ServerPort(2)", 19132);
conf.init("ServerName(3)", "服务器名称");
conf.init("image(3)", "");
conf.init("ServerIP(3)", "127.0.0.1");
conf.init("ServerPort(3)", 19132);

mc.listen("onPlayerCmd", (pl, cmd) => {
  if (cmd === "transfer") {
    pl.sendSimpleForm(
      "跨服传送菜单",
      "选择要进行传送的服务器",
      [
        conf.get("ServerName(1)"),
        conf.get("ServerName(2)"),
        conf.get("ServerName(3)"),
      ],
      [conf.get("image(1)"), conf.get("image(2)"), conf.get("image(3)")],
      (pl, Number) => {
        if (Number === 0) {
          if (conf.get("ServerName(1)") !== "") {
            pl.tell("[Transfer]3秒后将传送至目标服务器");
            setTimeout(() => {
              pl.transServer(
                conf.get("ServerIP(1)"),
                conf.get("ServerPort(1)")
              );
            }, 3000);
          } else {
            pl.tell("[Transfer]未能传送到目标服务器");
          }
        }
        if (Number === 1) {
          if (conf.get("ServerName(2)") !== "") {
            pl.tell("[Transfer]3秒后将传送至目标服务器");
            setTimeout(() => {
              pl.transServer(
                conf.get("ServerIP(2)"),
                conf.get("ServerPort(2)")
              );
            }, 3000);
          } else {
            pl.tell("[Transfer]未能传送到目标服务器");
          }
        }

        if (Number === 2) {
          if (conf.get("ServerName(3)") !== "") {
            pl.tell("[Transfer]3秒后将传送至目标服务器");
            setTimeout(() => {
              pl.transServer(
                conf.get("ServerIP(3)"),
                conf.get("ServerPort(3)")
              );
            }, 3000);
          } else {
            pl.tell("[Transfer]未能传送到目标服务器");
          }
        }
      }
    );
  }
});
