// LiteLoader-AIDS automatic generated
/// <reference path="c:\Users\Administrator\.vscode/dts/helperlib/src/index.d.ts"/> 

ll.registerPlugin(
    /* name */ "Group_and_BDS",
    /* introduction */ "群服消息互通",
    /* version */[0, 0, 1],
    /* otherInformation */ {
        author: "xianyubb",
        qqGroup: "865286891"
    }
);

const config = new JsonConfigFile(".\\plugins\\Group_and_BDS\\config.json", `{}`)

config.init("ws", "ws://localhost:8081")

let wsc = new WSClient()

wsc.connectAsync(config.get("ws"), (success) => {
    if (success) {
        log("bot端连接成功")
        mc.listen("onChat", (Player, msg) => {
            wsc.send(`[server] ${Player.name} > ${msg}`)
        })
        wsc.listen("onTextReceived", (data) => {
            log(data)
            mc.broadcast(data)
        })
    } else {
        log("bot端连接失败")
    }
})