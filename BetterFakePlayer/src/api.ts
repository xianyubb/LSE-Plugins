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

/**
 * 为玩家生成一个假人
 * @param Player 玩家类型
 * @param name 假人名
 * @param pos 整数坐标对象
 */
function spawnSimilatedPlayer(Player: Player, name: string, pos: IntPos) {
  Player.tell(`[BetterFakePlayer]成功为玩家${Player.name}生成了一个假人`);

  return mc.spawnSimulatedPlayer(name, pos);
}
/**
 * 假人断开连接
 * @param SimulatedPlayer
 */
function DisConnect(SimulatedPlayer: any): boolean {
  return SimulatedPlayer.simulateDisconnect();
}
/**
 * 假人攻击
 * @param {SimulatedPlayer} SimulatedPlayer 假人类型
 * @param target 攻击对象
 * @param Times 攻击次数
 * @param interval 攻击间隔
 */
function Attack(
  SimulatedPlayer: any,
  target: Entity,
  Times: number = 1,
  interval: number = 200
): boolean | any {
  let result;
  for (let i = 0; i < Times; i++) {
    setTimeout(() => {
      result = SimulatedPlayer.simulateAttack(target);
    }, interval);
  }
  return result;
}

/**
 * 假人破坏方块
 * @param {SimulatedPlayer} SimulatedPlayer 假人类型
 * @param target 破坏对象
 */
function Destory(SimulatedPlayer: any, target: IntPos): boolean {
  return SimulatedPlayer.simulateDestroy(target);
}

/**
 * 假人停止破坏方块
 * @param {SimulatedPlayer} SimulatedPlayer 假人类型
 */
function StopDestoringBlock(SimulatedPlayer: any): boolean {
  return SimulatedPlayer.simulateStopDestroyingBlock;
}

/**
 * 假人跳跃
 * @param {SimulatedPlayer} SimulatedPlayer 假人类型
 * @para Times 跳跃次数
 */
function Jump(SimulatedPlayer: any, Times: number = 1): boolean {
  let result;
  for (let i = 0; i < Times; i++) {
    result = SimulatedPlayer.simulateJump();
  }
  return result;
}

/**
 * 假人看向某方块或实体
 * @param {SimulatedPlayer} SimulatedPlayer 假人类型
 * @param target 要看向的实体
 */
function Lookat(SimulatedPlayer: any, target: IntPos | Entity): boolean {
  return SimulatedPlayer.simulateLookAt(target);
}

/**
 * 设置假人身体角度
 * @param {SimulatedPlayer} SimulatedPlayer 假人类型
 * @param rot 角度
 */
function Bodyrot(SimulatedPlayer: any, rot: number): boolean {
  return SimulatedPlayer.simulateSetBodyRotation(rot);
}

/**
 * 假人相对玩家坐标系移动
 * @param {SimulatedPlayer} SimulatedPlayer 假人类型
 * @param target 目标坐标
 */
function LocalMove(SimulatedPlayer: any, target: IntPos): boolean {
  return SimulatedPlayer.simulateLocalMove(target);
}

/**
 * 假人相对世界坐标系移动
 * @param {SimulatedPlayer} SimulatedPlayer 假人类型
 * @param target 目标坐标
 */
function WorldMove(SimulatedPlayer: any, target: IntPos): boolean {
  return SimulatedPlayer.simulateWorldMove(target);
}

/**
 * 假人停止移动
 * @param {SimulatedPlayer} SimulatedPlayer 假人类型
 */
function StopMove(SimulatedPlayer: any): boolean {
  return SimulatedPlayer.simulateStopMoving();
}

/**
 * 检测提供的Name是否为一个假人
 * @param name 假人名
 */
function isfakeplayer(name: string): false | any | undefined {
  for (let i = 0; i < mc.getOnlinePlayers().length; i++) {
    const Player = mc.getOnlinePlayers()[i];
    if (Player.isSimulatedPlayer() === true && Player.name === name) {
      return Player;
    } else if (Player.isSimulatedPlayer() === false) {
      return false;
    }
  }
}

/**
 * 获取在线假人
 */
function onlineFakePlayer() {
  let PlayerArr = mc.getOnlinePlayers();
  for (let i = 0; i < PlayerArr.length; i++) {
    if (PlayerArr[i].isSimulatedPlayer() === true) {
      let FakePlayer = [];
      FakePlayer.push(PlayerArr[i]);
      return FakePlayer;
    }
  }
}

/**
 * 查询玩家执行的哪个命令并执行相应函数
 * @param result 指令回调结果
 */
function cmd(result: any) {
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
    } else if (result["disconnects"]) {
      return DisConnect(FakePlayer);
    }
  } else {
    return FakePlayer;
  }
}

/* 表单模块 */

/**
 * 向玩家发送是否打开管理表单的表单
 * @param Player 玩家类型
 */

function ModalForm(Player: Player) {
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
}

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
 * @param Player
 */
function basicForm(Player: Player): number | null {
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
}

export {
  spawnSimilatedPlayer,
  Jump,
  Bodyrot,
  Attack,
  StopDestoringBlock,
  StopMove,
  LocalMove,
  WorldMove,
  Lookat,
  ModalForm,
  basicForm,
  onlineFakePlayer,
  isfakeplayer,
  cmd,
  Destory,
  Data,
  Config,
  DisConnect,
};
