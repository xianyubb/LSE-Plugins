/// <reference path="SereinJSPluginHelper.js"/>
let ys = {
  name: "yunshi",
  value: "v1.0",
  author: "xianyubb",
  discription: "运势插件",
};
serein.registerPlugin(ys.name, ys.value, ys.author, ys.discription);

//随机数

//发送消息
//检测输入运势发消息
serein.setListener("onReceiveGroupMessage", onReceiveGroupMessage);
function onReceiveGroupMessage(group, user, msg, showName) {
  m = msg;
  let a = Math.floor(Math.random() * 101);
  let b = Math.floor(Math.random() * 101);
  let c = Math.floor(Math.random() * 101);
  if (m === "运势") {
    let e = serein.sendGroup(
      group,
      `这是你今天的运势\n事业运:${a}\n桃花运:${b}\n财运:${c}`
    );
  }
}
