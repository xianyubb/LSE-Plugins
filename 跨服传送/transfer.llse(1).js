// LiteLoader-AIDS automatic generated
/// <reference path="c:\Users\Administrator\.vscode/dts/HelperLib-master/src/index.d.ts"/>

const PLUGIN_NAME = "Transfer";
const PLUGIN_VERSION = [0, 2, 0];

let _Config = {
  setting: {
    buttons: [
      {
        text: "servername",
        IP: "127.0.0.1",
        Port: 19132,
      },
    ],
  },
};
const Config = new JsonConfigFile(
  `.\\plugins\\${PLUGIN_NAME}\\config.json`,
  JSON.stringify(_Config)
);

let FormJson = {
  type: "form",
  title: PLUGIN_NAME,
  content: "请选择要传送的服务器",
};

const transfer = mc.newCommand("transfer", "跨服传送", PermType.Any);
transfer.overload([]);
transfer.setCallback((_cmd, _ori, out, res) => {
  if (_ori.player) {
    _ori.player.sendCustomForm(
      JSON.stringify(Object.assign({}, FormJson, Config.get("setting"))),
      (Player, data) => {
        if (typeof data === "number") {
          let main = Config.get("setting")["buttons"][data];
          let IP = main["IP"];
          let Port = main["Port"];
          Player.transServer(IP, Port);
        } else {
          Player.tell("关闭了表单");
        }
      }
    );
  }
});
transfer.setup();
