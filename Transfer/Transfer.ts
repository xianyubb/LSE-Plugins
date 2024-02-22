/// <reference path="E:/code/helperlib/src/index.d.ts" />

import { XYSimpleForm } from "./SimpleForm";
import { XYCustomForm } from "./CustomForm";
// import { XYCustomForm } from "./plugins/Transfer/CustomForm.js";
// import { XYSimpleForm } from "./plugins/Transfer/SimpleForm.js";


const PLUGIN_NAME: string = "Transfer";

interface Server {
    Name: string;
    IP: string;
    Port: number;
}

interface Config {
    MotdIP: string;
    MotdPort: number;
    Server: Server[];
}


interface ServerInfo extends Server {
    Status: string;
    Online: number,
    Max: number;
    Motd: string;
    Level: string;
}

const Conf = new JsonConfigFile(`./plugins/${PLUGIN_NAME}/config.json`)

const MotdIP: string = Conf.init("MotdIP", "127.0.0.1");
const MotdPort: number = Conf.init("MotdPort", 8080);
const Servers: Server[] = Conf.init("Servers", [
    {
        Name: "server1",
        IP: "127.0.0.1",
        Port: 19132,
    }
])

const MotdUrl = `http://${MotdIP}:${MotdPort}/api?host=$1:$2`;

async function Motd(Server: Server): Promise<ServerInfo> {
    return new Promise((reslove, reject) => {
        network.httpGet(MotdUrl.replace("$1", Server.IP).replace("$2", `${Server.Port}`), (status: number, result: string) => {
            if (status === 200) {
                let res = JSON.parse(result);
                let ServerMesssage: ServerInfo = {
                    Name: Server.Name,
                    IP: Server.IP,
                    Port: Server.Port,
                    Status: res.status,
                    Online: res.online,
                    Max: res.max,
                    Motd: res.motd,
                    Level: res.level_name
                };
                reslove(ServerMesssage);
            } else reject({
                Name: Server.Name,
                IP: Server.IP,
                Port: Server.Port,
                Status: "获取失败",
                Online: 0,
                Max: 0,
                Motd: '',
                Level: ''
            })
        });
    })
}

function MotdForm(ServerInfo: ServerInfo, PLayer: Player) {
    const Form = new XYCustomForm("Transfer", PLayer);
    Form.addLabel(`服务器: ${ServerInfo.Name}`, () => { })
        .addLabel(`IP: ${ServerInfo.IP}`, () => { })
        .addLabel(`端口: ${ServerInfo.Port}`, () => { })
        .addLabel(`状态: ${ServerInfo.Status}`, () => { })
        .addLabel(`在线人数: ${ServerInfo.Online}`, () => { })
        .addLabel(`最大人数: ${ServerInfo.Max}`, () => { })
        .addLabel(`Motd: ${ServerInfo.Motd}`, () => { })
        .addLabel(`地图名: ${ServerInfo.Level}`, () => { })
        .addSwitch("是否传送到该服务器", (data: boolean, player) => {
            if (data) Transfer(ServerInfo, player);
        }, false)
        .send();
}

/**
 * 传送
 * @param Server 传送的服务器
 * @param Player 传送的玩家
 * @returns 是否成功传送
 */
function Transfer(Server: Server, Player: Player): boolean {
    if (Server.Port === null) Server.Port = 19132;
    return Player.transServer(Server.IP, Server.Port);
}


function SendSimpleForm(Player: Player) {
    const Form = new XYSimpleForm("Transfer", "请选择传送的服务器...", Player);
    Servers.forEach((Server) => {
        Form.addButton(Server.Name, async (player: Player) => {
            MotdForm(await Motd(Server), player);
        })
    })
    Form.send();
}

/** 注册命令 */
function RegisterCmd() {
    const cmd: Command = mc.newCommand("trans", "跨服传送", PermType.Any, 0x80);
    cmd.setAlias("tf");
    cmd.mandatory("Server", ParamType.String);
    cmd.optional("Port", ParamType.Int);
    cmd.overload([]);
    cmd.overload(["Server", "Port"]);
    cmd.setCallback((_cmd: Command, Origin: CommandOrigin, OutPut: CommandOutput, Result: Server): void => {
        if (!Origin.player) {
            OutPut.error("执行命令主体必须是玩家!!!");
            return;
        }
        if (Result.IP != undefined) {
            if (Transfer(Result, Origin.player)) {
                Origin.player.tell("传送成功");
                return;
            } else Origin.player.tell("传送失败");
        }
        SendSimpleForm(Origin.player)
    })
    cmd.setup();
}

mc.listen("onServerStarted", () => {
    RegisterCmd();
})