//LiteLoaderScript Dev Helper
/// <reference path="c:\Users\Administrator\.vscode/dts/HelperLib-master/src/index.d.ts"/>

const PLUGIN_NAME = "onJoin";
ll.registerPlugin(
  /* name */ PLUGIN_NAME,
  /* introduction */ "一个小小的入服欢迎提示",
  /* version */ [0, 1, 0],
  /* otherInformation */ {
    author: "xianyubb",
  }
);

class Send {
  /**
   *
   * @param {Player} Player
   */
  constructor(Player) {
    this.Player = Player;
    this.msg = `[§4系统提示§r]§4§l欢迎玩家§e[${this.Player.name}]§4进入服务器`;
  }
  only() {
    return this.Player.tell(this.msg);
  }
  quan() {
    return mc.broadcast(this.msg, 3);
  }
  title() {
    return this.Player.setTitle(this.msg, 3);
  }
  Toast() {
    return this.Player.sendToast("§6§l入服欢迎", this.msg);
  }
  console() {
    return logger.log(this.msg);
  }
}

mc.listen("onJoin", (Player) => {
  let send = new Send(Player);
  send.only();
  send.quan();
  send.title();
  send.Toast();
  send.console();
  return false;
});
