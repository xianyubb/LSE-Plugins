//LiteLoaderScript Dev Helper
/// <reference path="c:\Users\Administrator\.vscode/dts/HelperLib-master/src/index.d.ts"/>

const PLUGIN_NAME = "GuessWord";
const PLUGIN_VERSION = [0, 0, 1];

const PLUGIN_DATA_PATH = `plugins/${PLUGIN_NAME}`;
const PLUGIN_CONFIG_PATH = `${PLUGIN_DATA_PATH}/config.json`;
const PLUGIN_DATE_PATH = `${PLUGIN_DATA_PATH}/data.json`;

let PluginConfig = {
  llmoney: true,
  scoreName: "money",
};
let PluginDate = {};

let conf = new JsonConfigFile(PLUGIN_DATE_PATH);
let cf = new JsonConfigFile(PLUGIN_CONFIG_PATH);
function updateConfig() {
  File.writeTo(PLUGIN_CONFIG_PATH, JSON.stringify(PluginConfig, null, 2));
  File.writeTo(PLUGIN_DATE_PATH, JSON.stringify(PluginDate, null, 2));
}

function LoadConfig() {
  if (File.exists(PLUGIN_CONFIG_PATH)) {
    PluginConfig = JSON.parse(File.readFrom(PLUGIN_CONFIG_PATH));
  } else updateConfig();
  if (File.exists(PLUGIN_DATE_PATH)) {
    PluginConfig = JSON.parse(File.readFrom(PLUGIN_DATE_PATH));
  } else updateConfig();
}

LoadConfig();

let Answer = Boolean;
//注册命令
mc.listen("onServerStarted", () => {
  const cmd = mc.newCommand("guessword", "猜词", PermType.Any, 0x80);
  cmd.setAlias("gw");
  cmd.mandatory("Answer", ParamType.String);
  cmd.overload(["Answer"]);
  cmd.setCallback((_cmd, _ori, out, res) => {
    if (JSON.stringify(res.Answer) === JSON.stringify(conf.get("Answer"))) {
      out.addMessage("回答正确");
      if (cf.get("llmoney") === true) {
        money.add(_ori.player.xuid, conf.get("Reward"));
        conf.delete("Answer");
        conf.reload();
      } else {
        let ob = mc.getScoreObjective(cf.get("scoreName"));
        ob.addScore(_ori.player, conf.get("Reward"));
      }
    } else out.addMessage("回答错误");
  });
  cmd.setup();
  const cmds = mc.newCommand("guesswordop", "猜词", PermType.GameMasters, 0x80);
  cmds.setAlias("gwop");
  cmds.optional("Question", ParamType.String);
  cmds.optional("Answer", ParamType.String);
  cmds.optional("Reward", ParamType.Int);
  cmds.overload(["Question", "Answer", "Reward"]);
  cmds.setCallback((_cmd, _ori, out, res) => {
    File.writeTo(PLUGIN_DATE_PATH, JSON.stringify(res));
    conf.reload();
  });
  cmds.setup();
});

mc.listen("onPlayerCmd", (pl, cmd) => {
  if (cmd.trim() === "gwop" || cmd.trim() === "guesswordop") {
    let fm = mc.newCustomForm();
    fm.setTitle("GuessWord");
    fm.addInput("请输入问题", "String");
    fm.addInput("请输入答案", "String");
    fm.addInput("请输入奖励金额", "Number");
    pl.sendForm(fm, (pl, data) => {
      let Qu = data[0],
        An = data[1],
        Re = parseInt(data[2]);

      File.writeTo(
        PLUGIN_DATE_PATH,
        JSON.stringify({ Question: Qu, Answer: An, Reward: Re })
      );

      conf.reload();
    });
  }
});

ll.registerPlugin(PLUGIN_NAME, "自助猜词", PLUGIN_VERSION, {
  author: "xianyubb",
});

log(`插件${PLUGIN_NAME}已加载`);
