// LiteLoader-AIDS automatic generated
/// <reference path="../HelperLib/src/index.d.ts"/>

ll.registerPlugin(
  /* name */ "Giveop",
  /* introduction */ "给予op",
  /* version */ [0, 1, 0],
  /* otherInformation */ { 作者: "xianyubb" }
);

let opid = new JsonConfigFile("plugins/Giveop/config.json");
opid.init("Key", "Keys");

mc.listen("onServerStarted", () => {
  const key = mc.newCommand("key", "输入Key", PermType.Any);
  key.mandatory("keys", ParamType.RawText);
  key.overload(["keys"]);
  key.setCallback((_cmd, _ori, out, res) => {
    if (res.keys === opid.get("Key")) {
      mc.runcmd(`op "${_ori.player.name}"`);
      _ori.player.tell("你已被给予OP");
    } else {
      _ori.player.tell("密码错误");
    }
  });
  key.setup();
});
