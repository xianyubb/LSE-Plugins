// LiteLoader-AIDS automatic generated
/// <reference path="../HelperLib/src/index.d.ts"/>

const PLUGIN_NAME = "Transfer";
const PLUGIN_VERSION = [0, 3, 2];

const CheckUpdate = ll.imports("cup", "checkUpdate");

mc.listen("onServerStarted", () => {
  if (!ll.hasExported(`cup`, `checkUpdate`)) {
    logger.warn(
      `检查更新失败！辅助插件CheckUpdate未安装。>>前往免费下载：https://www.minebbs.com/resources/checkupdate.4792/`
    );
  } else {
    CheckUpdate("transfer.llse(1).js", 5988, PLUGIN_VERSION, [
      `插件[${PLUGIN_NAME}]已是最新版本！`,
      `插件[${PLUGIN_NAME}]版本过时！当前版本：${PLUGIN_VERSION.join(
        `.`
      )} 最新版本：%latest_version% 前往%url%下载最新版本。`,
    ]);
  }
});

let _Config = {
  setting: {
    "MotdIP:Port": "win.xianyubb.top:23005",
    Server: [
      {
        text: "servername",
        ServerIP: "127.0.0.1",
        ServerPort: 19132,
      },
    ],
  },
};

/**
 * @typedef {string} _status 服务器运行状态
 * @typedef {number} online 服务器在线人数
 * @typedef {number} max 服务器最大人数
 * @typedef {string} motd 服务器motd
 * @typedef {string} level_name 服务器存档名称
 */
let _status;
let online;
let max;
let motd;
let level_name;

const Config = new JsonConfigFile(
  `.\\plugins\\${PLUGIN_NAME}\\config.json`,
  JSON.stringify(_Config)
);
let setting = Config.get("setting");
let Server = setting.Server;
let buttons = { buttons: Server };
let FormJson = Object.assign(
  {},
  {
    type: "form",
    title: PLUGIN_NAME,
    content: "请选择要传送的服务器...",
  },
  buttons
);

const transfer = mc.newCommand("transfer", "跨服传送", PermType.Any);
transfer.overload([]);
transfer.setCallback((_cmd, _ori, out, res) => {
  if (_ori.player) {
    sendCustomForm(_ori.player);
  }
});
transfer.setup();

/**
 * 向玩家发送自定义表单（Json格式）
 * @param {Player} Player
 */
function sendCustomForm(Player) {
  Player.sendCustomForm(JSON.stringify(FormJson), (Player, data) => {
    if (typeof data === "number") {
      ServerINFO(Player, data);
    }
  });
}
/**
 * 服务器motd查询
 * @param {Player} Player 玩家
 * @param {number} id 按钮id
 */
function ServerINFO(Player, id) {
  let main = setting["Server"][id];
  let IP = main["ServerIP"];
  let Port = main["ServerPort"];
  let url = `http://${setting["MotdIP:Port"]}/api?host=${IP}:${Port}`;
  network.httpGet(url, (sta, res) => {
    if (res) {
      let result = JSON.parse(res);
      _status = result["status"];
      online = result["online"];
      max = result["max"];
      motd = result["motd"];
      level_name = result["level_name"];
      let content =
        " 服务器名:  " +
        main["text"] +
        "\n 状态:  " +
        _status +
        "\n 在线人数/最大人数:  " +
        online +
        "/" +
        max +
        "\n motd:  " +
        motd +
        "\n 存档名：  " +
        level_name;
      Player.sendModalForm(
        PLUGIN_NAME,
        content,
        "前往",
        "返回",
        (Player, result) => {
          switch (result) {
            case true:
              Player.transServer(IP, Port);
            case false:
              sendCustomForm(Player);
          }
        }
      );
    } else {
      Player.sendModalForm(
        PLUGIN_NAME,
        "未连接到Motd服务器，将无法进行查询服务器状态\n但您仍可继续传送至目标服务器",
        "前往",
        "返回",
        (Player, result) => {
          switch (result) {
            case true:
              Player.transServer(IP, Port);
            case false:
              sendCustomForm(Player);
          }
        }
      );
    }
  });
}
