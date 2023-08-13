const bot = require("../app").bot

const ws = require("ws")
const fs = require("fs")


let config = JSON.stringify({
    wsaddress: "localhost",
    wsPort: 8081,
    ListenGroup: [114514]
})

if (!fs.existsSync("./plugins/Group_and_BDS/config.json")) {
    fs.mkdir("./plugins/Group_and_BDS", (err) => {
        if (err) throw new Error(err.message)
    })
    fs.writeFileSync("./plugins/Group_and_BDS/config.json", config, "utf8",)
}
const data = JSON.parse(fs.readFileSync("./plugins/Group_and_BDS/config.json").toString())
let bds = new ws.Server({
    address: data.wsaddress,
    port: data.wsPort
})

let listenGroup = data.ListenGroup

bds.on("connection", (ws) => {
    bot.BotEvents.on("onReceiveGroupMessage", (msg) => {
        console.log(msg)
        let data = msg
        listenGroup.forEach((group) => {
            if (data.group_id === group) {
                ws.send("[群聊] " + data.sender.nickname + " > " + data.message)
            }
        })
    })
    ws.on("message", (msg) => {
        let data = msg.toString()
        listenGroup.forEach((e) => {
            bot.send_group_msg(e, data, true)
        })
    })
    
})
