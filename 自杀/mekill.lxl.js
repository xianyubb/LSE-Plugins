//LiteLoaderScript Dev Helper
/// <reference path="c:\Users\Administrator\.vscode/dts/HelperLib-master/src/index.d.ts"/>

ll.registerPlugin(
  /* name */ "mekill",
  /* introduction */ "自杀",
  /* version */ [0, 0, 1],
  /* otherInformation */ {}
);

//注册命令
mc.listen("onServerStarted", () => {
  const cmd = mc.newCommand("mekill", "自杀", PermType.Any, 0x80, "mk");
  cmd.setEnum("action", ["player"]);
  cmd.optional("action", ParamType.Player);
  cmd.overload(["action"]);
  cmd.setCallback((_cmd, _ori, out, res) => {});
  cmd.setup();
});

mc.listen("onPlayerCmd", (pl, cmd) => {
  switch (cmd) {
    case "mekill":
      pl.kill();
      break;
    case "mk":
      pl.kill();
      break;
  }
});
