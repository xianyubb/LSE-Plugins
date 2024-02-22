/// <reference path="E:/Code/Helperlib/src/index.d.ts" />

const PLUGIN_NAME = "recover";
ll.registerPlugin(PLUGIN_NAME, "回溯", [0, 1, 0], {
    author: "xianyubb",
    QQ: "2149656630"
});

/** 配置文件 */
const Conf = new JsonConfigFile(`./plugins/${PLUGIN_NAME}/config.json`);
/** 数据文件 */
const DataFile = new JsonConfigFile(`./plugins/${PLUGIN_NAME}/data.json`);
;
/** 传送时间间隔(单位: s) */
const Cd = Conf.init("cd", 120);
/** 城市 */
const City = Conf.init("city", [
    {
        /** 城市名  */
        name: "city1",
        /** 坐标数组 */
        pos: [0, 0, 0, 0],
        /** 半径 */
        Radius: 500
    },
    {
        /** 城市名  */
        name: "city2",
        /** 坐标数组 */
        pos: [0, 0, 0, 0],
        /** 半径 */
        Radius: 500
    }
]);
/**
 * 坐标对象转数组
 * @param pos 坐标对象
 * @returns 坐标数组
 */
function IntPosToArray(pos) {
    return [pos.x, pos.y, pos.z, pos.dimid];
}
/**
 * 坐标对象转数组
 * @param pos 坐标数组
 * @returns 坐标对象
 */
function ArrayToIntPos(pos) {
    return new IntPos(pos[0], pos[1], pos[2], pos[3]);
}
/**
 * 获取玩家坐标(数组形式)
 * @param player 玩家对象
 */
function getPos(player) {
    return [player.blockPos.x, player.blockPos.y, player.blockPos.z, player.blockPos.dimid];
}
/**
 * 获取玩家坐标(坐标对象形式)
 * @param player 玩家对象
 */
function getPos2(player) {
    return new IntPos(player.blockPos.x, player.blockPos.y, player.blockPos.z, player.blockPos.dimid);
}
/**
 * 检测玩家是否可以进行传送
 * @param player 玩家对象
 * @returns 如果为 true 则可以 如果为 false 则不可以
 */
function isNearDeath(player) {
    const now = DataFile.get(player.xuid).LastTpTime;
    const last = DataFile.get(player.xuid).DeathTime;
    if (last - now >= Cd)
        return true;
    else
        return false;
}
/**
 * 异步检测
 */
function sleep(ms) {
    return new Promise((resolve) => {
        setInterval(() => resolve(ms), ms);
    });
}
/**
 * 检测玩家是否在某城市内
 * @param player 玩家对象
 * @returns 如果在则返回 true 如果不在则返回 false 默认返回 false
 */
function isInCity(player) {
    let res;
    const pos = player.blockPos;
    const x = Math.abs(pos.x);
    const y = Math.abs(pos.y);
    for (let i = 0; i < City.length; i++) {
        if (City[i].pos[3] === pos.dimid && City[i].pos[0] + City[i].Radius >= x && City[i].pos[2] + City[i].Radius >= y) {
            res = true;
            break;
        }
        else {
            if (res === true)
                break;
            res = false;
            break;
        }
    }
    return res;
}
async function setListener() {
    mc.listen("onPlayerDie", (player, _source) => {
        let time = new Date().getTime();
        DataFile.set(player.xuid, {
            DeathPos: IntPosToArray(player.blockPos),
            DeathTime: time,
            LastTpTime: time,
        });
        player.sendToast("回溯", `检测到玩家死亡 在未来${Cd / 60}分钟内你的回溯位置不会更新`);
    });
    setInterval(() => {
        (async () => {
            mc.getOnlinePlayers().forEach((player) => {
                if (player.gameMode !== 0)
                    return;
                if (!isInCity(player))
                    return;
                let time = DataFile.get(player.xuid).DeathTime;
                let time2 = DataFile.get(player.xuid).LastTpTime;
                if (!isNearDeath(player)) {
                    DataFile.set(player.xuid, {
                        DeathPos: DataFile.get(player.xuid).DeathPos,
                        DeathTime: time += 1,
                        LastTpTime: time2,
                    });
                    return;
                }
                else {
                    DataFile.get(player.xuid).DeathTime;
                    DataFile.set(player.xuid, {
                        DeathPos: IntPosToArray(player.blockPos),
                        DeathTime: time,
                        LastTpTime: time2,
                    });
                    return;
                }
            });
        })();
    }, await sleep(1000));
}
/**
 * 命令触发时的操作
 * @param players 要回溯的玩家对象数组
 * @param out 命令输出对象
 * @returns 我也不知道为什么要返回个 true
 */
function onCmd(players, out) {
    players.forEach((player) => {
        const pos = DataFile.get(player.xuid).DeathPos;
        let time = new Date().getTime();
        DataFile.set(player.xuid, {
            DeathPos: IntPosToArray(player.blockPos),
            DeathTime: time,
            LastTpTime: time,
        });
        player.teleport(ArrayToIntPos(pos));
        player.sendText(`已回溯到 ${pos}`);
        out.success(`已将 ${player.realName} 回溯到 ${pos}`);
    });
    return true;
}
function RegisterCmd() {
    const cmd = mc.newCommand("recover", "recover", PermType.GameMasters);
    cmd.mandatory("player", ParamType.Player);
    cmd.overload(["player"]);
    cmd.setCallback((_cmd, ori, out, res) => {
        switch (ori.type) {
            case OriginType.Player:
                {
                    let player = ori.player;
                    if (!player.isOP())
                        out.error("你没有权限使用此命令");
                    else
                        return onCmd(res.player, out);
                    break;
                }
                ;
            default: {
                return onCmd(res.player, out);
            }
        }
    });
    cmd.setup();
}
mc.listen("onServerStarted", () => {
    RegisterCmd();
    setListener();
});
