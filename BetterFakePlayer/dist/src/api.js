"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Config = exports.Data = exports.Destory = exports.cmd = exports.isfakeplayer = exports.onlineFakePlayer = exports.basicForm = exports.ModalForm = exports.Lookat = exports.WorldMove = exports.LocalMove = exports.StopMove = exports.StopDestoringBlock = exports.Attack = exports.Bodyrot = exports.Jump = exports.spawnSimilatedPlayer = void 0;
let Config = new JsonConfigFile(`.\\plugins\\${PLUGIN_NAME}\\config.json`, JSON.stringify({
    MoneyType: "Score",
    ScoreName: "money",
    buy: true,
    max_fakeplayer: 5,
}));
exports.Config = Config;
let Data = new JsonConfigFile(`.\\plugins\\${PLUGIN_NAME}\\data.json`);
exports.Data = Data;
let spawnSimilatedPlayer = (Player, name, pos) => {
    Player.tell(`[BetterFakePlayer]成功为玩家${Player.name}生成了一个假人`);
    return mc.spawnSimulatedPlayer(name, pos);
};
exports.spawnSimilatedPlayer = spawnSimilatedPlayer;
let Attack = (SimulatedPlayer, target, Times = 1, interval = 200) => {
    for (let i = 0; i < Times; i++) {
        setInterval(async () => {
            return SimulatedPlayer.simulateAttack(target);
        }, interval);
    }
};
exports.Attack = Attack;
let Destory = (SimulatedPlayer, target) => {
    return SimulatedPlayer.simulateDestroy(target);
};
exports.Destory = Destory;
let StopDestoringBlock = (SimulatedPlayer) => {
    return SimulatedPlayer.simulateStopDestroyingBlock;
};
exports.StopDestoringBlock = StopDestoringBlock;
let Jump = (SimulatedPlayer, Times = 1) => {
    for (let i = 0; i < Times; i++) {
        return SimulatedPlayer.simulateJump();
    }
};
exports.Jump = Jump;
let Lookat = (SimulatedPlayer, target) => {
    return SimulatedPlayer.simulateLookAt(target);
};
exports.Lookat = Lookat;
let Bodyrot = (SimulatedPlayer, rot) => {
    return SimulatedPlayer.simulateSetBodyRotation(rot);
};
exports.Bodyrot = Bodyrot;
let LocalMove = (SimulatedPlayer, target) => {
    return SimulatedPlayer.simulateLocalMove(target);
};
exports.LocalMove = LocalMove;
let WorldMove = (SimulatedPlayer, target) => {
    return SimulatedPlayer.simulateWorldMove(target);
};
exports.WorldMove = WorldMove;
let StopMove = (SimulatedPlayer) => {
    return SimulatedPlayer.simulateStopMoving();
};
exports.StopMove = StopMove;
let isfakeplayer = (name) => {
    for (let i = 0; i < mc.getOnlinePlayers().length; i++) {
        const Player = mc.getOnlinePlayers()[i];
        if (Player.isSimulatedPlayer() === true && Player.name === name) {
            return Player;
        }
        else if (Player.isSimulatedPlayer() === false) {
            return false;
        }
    }
};
exports.isfakeplayer = isfakeplayer;
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
exports.onlineFakePlayer = onlineFakePlayer;
function cmd(result) {
    let FakePlayer = isfakeplayer(result.name);
    let times = result["times"];
    let pos = result["pos"];
    if (FakePlayer) {
        if (result["jumps"]) {
            if (times) {
                return Jump(FakePlayer, times);
            }
            else {
                return Jump(FakePlayer);
            }
        }
        else if (result["attacks"]) {
            if (times && result["interval"]) {
                return Attack(FakePlayer, result["target"], times, result["interval"]);
            }
            else if (result["interval"]) {
                return Attack(FakePlayer, result["target"], 1, result["interval"]);
            }
            else {
                return Attack(FakePlayer, result["target"], 1, 0);
            }
        }
        else if (result["lookats"]) {
            return Lookat(FakePlayer, pos);
        }
        else if (result["destorys"]) {
            return Destory(FakePlayer, pos);
        }
        else if (result["stopdestorys"]) {
            return StopDestoringBlock(FakePlayer);
        }
        else if (result["rot"]) {
            return Bodyrot(FakePlayer, result["rotint"]);
        }
    }
    else {
        return FakePlayer;
    }
}
exports.cmd = cmd;
let ModalForm = (Player) => {
    return Player.sendModalForm(PLUGIN_NAME, "请选择是否打开假人管理表单", "Yes", "No", (Player, result) => {
        switch (result) {
            case true:
                basicForm(Player);
                break;
            case false:
                Player.tell("玩家关闭了表单");
                break;
            default:
                Player.tell("玩家关闭了表单");
                break;
        }
    });
};
exports.ModalForm = ModalForm;
let basicForm = (Player) => {
    return Player.sendSimpleForm(PLUGIN_NAME, "请操作....", [
        "查看拥有的假人",
        "更改假人的名字",
        "传送假人至自己的位置",
        "假人断开连接",
        "假人高级功能",
    ], ["", "", "", "", ""], (Player, id) => {
        switch (id) {
            case 0:
                break;
            case 1:
                break;
            case 2:
                break;
            case 4:
                break;
            case 5:
                break;
            default:
                Player.tell("关闭了表单");
                break;
        }
    });
};
exports.basicForm = basicForm;
