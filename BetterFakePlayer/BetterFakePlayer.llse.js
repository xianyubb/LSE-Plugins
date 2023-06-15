// LiteLoader-AIDS automatic generated
/// <reference path="c:\Users\Administrator\.vscode/dts/HelperLib-master/src/index.d.ts"/>

const PLUGIN_NAME = "BetterFakePlayer";
ll.registerPlugin(
  /* name */ PLUGIN_NAME,
  /* introduction */ "更好的假人",
  /* version */ [0, 0, 1],
  /* otherInformation */ {
    author: "xianyubb",
    other: "未经允许禁止私自分享修改后的插件",
    qq: "2149656630",
  }
);

let Config = new JsonConfigFile(
  `.\\plugins\\${PLUGIN_NAME}\\config.json`,
  JSON.stringify({
    MoneyType: "Score",
    ScoreName: "money",
    buy: true,
    max_fakeplayer: 5,
  })
);

let Data = new JsonConfigFile(`.\\plugins\\${PLUGIN_NAME}\\data.json`);

/** 注册fakeplayer命令 */
const fakeplayer = mc.newCommand("fakeplayer", "假人", PermType.Any, 0x80);
//命令别名
fakeplayer.setAlias("fp");
//main
fakeplayer.mandatory("name", ParamType.String);
fakeplayer.mandatory("pos", ParamType.BlockPos);
fakeplayer.optional("times", ParamType.Int);
fakeplayer.mandatory("target", ParamType.Actor);
//注册生成假人命令
fakeplayer.setEnum("ispawn", ["spawn", "dispawn"]);
fakeplayer.mandatory("isspawn", ParamType.Enum, "ispawn", 1);
fakeplayer.overload(["name", "isspawn"]);
//注册假人跳跃命令
fakeplayer.setEnum("jump", ["jump"]);
fakeplayer.mandatory("jumps", ParamType.Enum, "jump", 1);
fakeplayer.overload(["name", "jumps", "times"]);
//注册假人攻击命令
fakeplayer.setEnum("attack", ["attack"]);
fakeplayer.setEnum("repeat", ["repeat"]);
fakeplayer.mandatory("attacks", ParamType.Enum, "attack", 1);
fakeplayer.optional("repeats", ParamType.Enum, "repeat", 1);
fakeplayer.optional("interval", ParamType.Int);
fakeplayer.overload([
  "name",
  "attacks",
  "target",
  "repeats",
  "interval",
  "times",
]);
//注册假人看向某个位置命令
fakeplayer.setEnum("lookat", ["lookat"]);
fakeplayer.mandatory("lookats", ParamType.Enum, "lookat", 1);
fakeplayer.overload(["name", "lookats", "pos"]);
//注册假人破坏方块命令
fakeplayer.setEnum("destory", ["destory"]);
fakeplayer.mandatory("destorys", ParamType.Enum, "destory", 1);
fakeplayer.overload(["name", "destorys", "pos"]);
//注册假人停止破坏方块指令
fakeplayer.setEnum("stopdestory", ["stopdestory"]);
fakeplayer.mandatory("stopdestorys", ParamType.Enum, "stopdestory", 1);
fakeplayer.overload(["name", "stopdestorys"]);
//注册设置假人身体角度命令
fakeplayer.setEnum("rot", ["rot"]);
fakeplayer.mandatory("rots", ParamType.Enum, "rot", 1);
fakeplayer.mandatory("rotint", ParamType.Int);
fakeplayer.overload(["name", "rots", "rotint"]);
//命令回调
fakeplayer.setCallback((_cmd, _ori, out, res) => {
  if (_ori.player && _ori.player.isOP()) {
    if (cmd(res)) {
      _ori.player.tell("假人正在执行中...");
    } else {
      _ori.player.tell(`未找到名为${res["name"]}的假人`);
      _ori.player.tell(`正在为您生成名为${res["name"]}的假人`);
      let sp = spawnSimilatedPlayer(
        _ori.player,
        res["name"],
        _ori.player.blockPos
      );
    }
    //当命令执行者是OP玩家时
  } else if (_ori.player) {
    if (cmd(res)) {
      _ori.player.tell("假人正在执行中...");
    } else {
      _ori.player.tell(`未找到名为${res["name"]}的假人`);
    }
    //当命令执行者是普通玩家是
  } else {
    if (cmd(res)) {
      log("假人正在执行中...");
    } else {
      log(`未找到名为${res["name"]}的假人`);
      log(`正在为您生成名为${res["name"]}的假人`);
      let sp = mc.spawnSimulatedPlayer(res["name"], 0, 0, 0, 0);
      log(`已在主世界0，0，0坐标生成创造假人`);
      sp.setGameMode(1);
    }
    //当命令执行者非玩家时
  }
});
//安装命令
fakeplayer.setup();

/**
 * 为玩家生成一个假人
 * @param {Player} Player 玩家类型
 * @param {string} name 假人名
 * @param {IntPos} pos 整数坐标对象
 */
let spawnSimilatedPlayer = (Player, name, pos) => {
  Player.tell(`[BetterFakePlayer]成功为玩家${Player.name}生成了一个假人`);

  return mc.spawnSimulatedPlayer(name, pos);
};

/**
 * 假人攻击
 * @param {SimulatedPlayer} SimulatedPlayer 假人类型
 * @param {Entity} target 攻击对象
 * @param {number} Times 攻击次数
 * @param {number} interval 攻击间隔
 */
let Attack = (SimulatedPlayer, target, Times = 1, interval = 200) => {
  for (let i = 0; i < Times; i++) {
    setInterval(async () => {
      return SimulatedPlayer.simulateAttack(target);
    }, interval);
  }
};

/**
 * 假人破坏方块
 * @param {SimulatedPlayer} SimulatedPlayer 假人类型
 * @param {IntPos} target 破坏对象
 */
let Destory = (SimulatedPlayer, target) => {
  return SimulatedPlayer.simulateDestroy(target);
};

/**
 * 假人停止破坏方块
 * @param {SimulatedPlayer} SimulatedPlayer 假人类型
 */
let StopDestoringBlock = (SimulatedPlayer) => {
  return SimulatedPlayer.simulateStopDestroyingBlock;
};

/**
 * 假人跳跃
 * @param {SimulatedPlayer} SimulatedPlayer 假人类型
 * @param {number} Times 跳跃次数
 */
let Jump = (SimulatedPlayer, Times = 1) => {
  for (let i = 0; i < Times; i++) {
    return SimulatedPlayer.simulateJump();
  }
};

/**
 * 假人看向某方块或实体
 * @param {SimulatedPlayer} SimulatedPlayer 假人类型
 * @param {IntPos|Entity} target 要看向的实体
 */
let Lookat = (SimulatedPlayer, target) => {
  return SimulatedPlayer.simulateLookAt(target);
};

/**
 * 设置假人身体角度
 * @param {SimulatedPlayer} SimulatedPlayer 假人类型
 * @param {number} rot 角度
 */
let Bodyrot = (SimulatedPlayer, rot) => {
  return SimulatedPlayer.simulateSetBodyRotation(rot);
};

/**
 * 假人相对玩家坐标系移动
 * @param {SimulatedPlayer} SimulatedPlayer 假人类型
 * @param {IntPos} target 目标坐标
 */
let LocalMove = (SimulatedPlayer, target) => {
  return SimulatedPlayer.simulateLocalMove(target);
};

/**
 * 假人相对世界坐标系移动
 * @param {SimulatedPlayer} SimulatedPlayer 假人类型
 * @param {IntPos} target 目标坐标
 */
let WorldMove = (SimulatedPlayer, target) => {
  return SimulatedPlayer.simulateWorldMove(target);
};

/**
 * 假人停止移动
 * @param {SimulatedPlayer} SimulatedPlayer 假人类型
 */
let StopMove = (SimulatedPlayer) => {
  return SimulatedPlayer.simulateStopMoving();
};

/**
 * 检测提供的Name是否为一个假人
 * @param {string} name 假人名
 */
let isfakeplayer = (name) => {
  for (let i = 0; i < mc.getOnlinePlayers().length; i++) {
    const Player = mc.getOnlinePlayers()[i];
    if (Player.isSimulatedPlayer() === true && Player.name === name) {
      return Player;
    } else if (Player.isSimulatedPlayer === false) {
      return false;
    }
  }
};

/**
 * 获取在线假人
 */
let onlineFakePlayer = () => {
  let PlayerArr = mc.getOnlinePlayers();
  for (let i = 0; i < PlayerArr.length; i++) {
    if (PlayerArr[i].isSimulatedPlayer() === true) {
      let FakePlayer = [];
      FakePlayer.push(PlayerArr[i]);
      return FakePlayer;
    }
  }
};

/**
 * 查询玩家执行的哪个命令并执行相应函数
 * @param {any} result 指令回调结果
 */
function cmd(result) {
  let FakePlayer = isfakeplayer(result.name);
  let times = result["times"];
  let pos = result["pos"];

  if (FakePlayer) {
    if (result["jumps"]) {
      if (times) {
        return Jump(FakePlayer, times);
      } else {
        return Jump(FakePlayer);
      }
    } else if (result["attacks"]) {
      if (times && result["interval"]) {
        return Attack(FakePlayer, result["target"], times, result["interval"]);
      } else if (result["interval"]) {
        return Attack(FakePlayer, result["target"], 1, result["interval"]);
      } else {
        return Attack(FakePlayer, result["target"], 1, 0);
      }
    } else if (result["lookats"]) {
      return Lookat(FakePlayer, pos);
    } else if (result["destorys"]) {
      return Destory(FakePlayer, pos);
    } else if (result["stopdestorys"]) {
      return StopDestoringBlock(FakePlayer);
    } else if (result["rot"]) {
      return Bodyrot(FakePlayer, result["rotint"]);
    }
  } else {
    return FakePlayer;
  }
}

/* 表单模块 */

/**
 * 向玩家发送是否打开管理表单的表单
 * @param {Player} Player 玩家类型
 */

let ModalForm = (Player) => {
  return Player.sendModalForm(
    PLUGIN_NAME,
    "请选择是否打开假人管理表单",
    "Yes",
    "No",
    (Player, result) => {
      switch (result) {
        case true:
          //发送表单
          basicForm(Player);
          break;
        case false:
          Player.tell("玩家关闭了表单");
          break;
        default:
          Player.tell("玩家关闭了表单");
          break;
      }
    }
  );
};

/*
1.假人基础功能表单
title:PLUGIN_NAME
content:请操作....
button1:查看拥有的假人（从配置文件读取） - 选择是否操作某个假人 - 假人功能表单
button2:更改假人的名字（需要假人重新进入游戏）
button3:传送假人至自己的位置
button4:假人断开连接
button5:假人功能表单

假人高级功能表单
title：PLUGIN_NAME
content：请操作....
button1:跳跃表单
button2:攻击表单
button3:破坏方块表单(x)
button4:看向某个地方表单(x)
button5:设置假人身体角度
*/

/**
 * 假人基础功能表单
 * @param {Player} Player
 * @returns {number|null}
 */
let basicForm = (Player) => {
  return Player.sendSimpleForm(
    PLUGIN_NAME,
    "请操作....",
    //buttons
    [
      "查看拥有的假人",
      "更改假人的名字",
      "传送假人至自己的位置",
      "假人断开连接",
      "假人高级功能",
    ],
    //images
    ["", "", "", "", ""],

    (Player, id) => {
      switch (id) {
        case 0:
          //"查看拥有的假人"
          break;
        case 1:
          //"更改假人的名字"
          break;
        case 2:
          // "传送假人至自己的位置"
          break;
        case 4:
          // "假人断开连接"
          break;
        case 5:
          //"假人高级功能"""
          break;
        default:
          Player.tell("关闭了表单");
          break;
      }
    }
  );
};
