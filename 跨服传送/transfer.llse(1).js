// LiteLoader-AIDS automatic generated
/// <reference path="c:\Users\Administrator\.vscode/dts/HelperLib-master/src/index.d.ts"/>

const PLUGIN_NAME = "Transfer";
const PLUGIN_VERSION = [0, 3, 0];

let _Config = {
  setting: {
    "MotdIP:Port": "win.xianyubb.top:23005",
    buttons: [
      {
        text: "servername",
        IP: "127.0.0.1",
        Port: 19132,
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
let FormJson = Object.assign(
  {},
  {
    type: "form",
    title: PLUGIN_NAME,
    content: "请选择要传送的服务器...",
  },
  setting
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
  let main = setting["buttons"][id];
  let IP = main["IP"];
  let Port = main["Port"];
  let url = `http://${setting["MotdIP:Port"]}/api?host=${IP}:${Port}`;
  network.httpGet(url, (sta, res) => {
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
  });
}
