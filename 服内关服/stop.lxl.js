//LiteLoaderScript Dev Helper
/// <reference path="c:\Users\Administrator\.vscode/dts/llaids/src/index.d.ts"/>

ll.registerPlugin(
  /* name */ "stop",
  /* introduction */ "一个简单的OP服内关服",
  /* version */ [0, 0, 1],
  /* otherInformation */ {}
);

// 注册stop假命令
mc.listen("onServerStarted", () => {
  mc.regPlayerCmd(
    "stop",
    "关闭服务器",
    function (pl) {
      pl.tell("执行成功");
    },
    1
  );
});

mc.listen("onPlayerCmd", (pl, [stop]) => {
  let open = pl.isOP();
  if ((open = true)) {
     mc.broadcast("即将在三秒后关闭服务器");
    setTimeout(() => {
      mc.runcmd("stop");
    }, 3000);
  }
});
