// LiteLoader-AIDS automatic generated
/// <reference path="c:\Users\Administrator\.vscode/dts/HelperLib-master/src/index.d.ts"/>

ll.registerPlugin(
  /* name */ "BetterFakePlayer",
  /* introduction */ "更好的假人",
  /* version */ [0, 0, 1],
  /* otherInformation */ {
    author: "xianyubb",
    other: "未经允许禁止私自分享修改后的插件",
    qq: "2149656630",
  }
);
mc.spawnSimulatedPlayer("hhh", 0, 0, 0, 0);

/** 注册fakeplayer命令 */
const fakeplayer = mc.newCommand("fakeplayer", "假人", PermType.Any, 0x80);
//命令别名
fakeplayer.setAlias("fp");
//main
fakeplayer.mandatory("name", ParamType.String);
fakeplayer.mandatory("pos", ParamType.BlockPos);
//注册生成假人命令
fakeplayer.setEnum("ispawn", ["spawn", "dispawn"]);
fakeplayer.mandatory("ispawn", ParamType.Enum, "ispawn", 1);
fakeplayer.overload(["name", "ispawn"]);
//注册假人跳跃命令
fakeplayer.setEnum("jump", ["jump"]);
fakeplayer.mandatory("jump", ParamType.Enum, "jump", 1);
fakeplayer.overload(["name", "jump"]);
//注册假人攻击命令
fakeplayer.setEnum("attack", ["attack"]);
fakeplayer.setEnum("repeat", ["repeat"]);
fakeplayer.mandatory("attack", ParamType.Enum, "attack", 1);
fakeplayer.optional("repeat", ParamType.Enum, "repeat", 1);
fakeplayer.optional("interval", ParamType.Int);
fakeplayer.optional("times", ParamType.Int);
fakeplayer.overload(["name", "attack", "repeat", "interval", "times"]);
//注册假人看向某个位置命令
fakeplayer.setEnum("lookat", ["lookat"]);
fakeplayer.mandatory("lookat", ParamType.Enum, "lookat", 1);
fakeplayer.overload(["name", "lookat", "pos"]);
//注册假人破坏方块命令
fakeplayer.setEnum("destory", ["destory"]);
fakeplayer.mandatory("destory", ParamType.Enum, "destory", 1);
fakeplayer.overload(["name", "destory", "pos"]);
//注册假人停止破坏方块指令
fakeplayer.setEnum("stopdestory", ["stopdestory"]);
fakeplayer.mandatory("stopdestory", ParamType.Enum, "stopdestory", 1);
fakeplayer.overload(["name", "stopdestory"]);
//注册设置假人身体角度命令
fakeplayer.setEnum("rot", ["rot"]);
fakeplayer.mandatory("rot", ParamType.Enum, "rot", 1);
fakeplayer.mandatory("rot-int", ParamType.Int);
fakeplayer.overload(["name", "rot", "rot-int"]);
//命令回调
fakeplayer.setCallback((_cmd, _ori, out, res) => {
  for (let key in res) {
    if (res[key] == null) {
      delete res[key];
    }
  }
  if (_ori.player && _ori.player.isOP() === true) {
    if (isfakeplayer(res.name)) {
      
    } else {
      let Player = _ori.player;
      let FakePlayer = spawnSimilatedPlayer(Player, res.name, Player.blockPos);
      FakePlayer.addTag(Player.name);
    }
    //执行命令的对象是op玩家时
  } else if (_ori.player) {
    //执行命令的对象是非op玩家时
    log("只有op才能执行此命令");
  } else {
    if (isfakeplayer(res.name)) {
    } else {
      mc.spawnSimulatedPlayer(res.name, 0, 0, 0, 0);
    }
    //执行命令的对象非玩家时
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
 */
let Attack = (SimulatedPlayer, target, Times) => {
  for (let i = 0; i < Times; i++) {
    return SimulatedPlayer.simulateAttack(target);
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
let Jump = (SimulatedPlayer, Times) => {
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
      return null;
    }
  }
};
