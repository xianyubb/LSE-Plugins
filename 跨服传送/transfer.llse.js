//LiteLoaderScript Dev Helper
/// <reference path="c:\Users\Administrator\.vscode/dts/HelperLib-master/src/index.d.ts"/>

const PLUGIN_NAME = "Transfer";
const PLUGIN_VERSION = [0, 1, 0];

const PLUGIN_DATA_PATH = `plugins/${PLUGIN_NAME}`;
const PLUGIN_CONFIG_PATH = `${PLUGIN_DATA_PATH}/config.json`;

let config = {
  FirstServer: [
    {
      NAME: "",
      IP: "127.0.0.1",
      PORT: 19132,
    },
  ],
  SecondServer: [
    {
      NAME: "",
      IP: "127.0.0.1",
      PORT: 19132,
    },
  ],
  ThirdServer: [
    {
      NAME: "",
      IP: "127.0.0.1",
      PORT: 19132,
    },
  ],
};

function dataconfig() {
  File.writeTo(PLUGIN_CONFIG_PATH, JSON.stringify(config, null, 2));
}

function loadconfig() {
  if (File.exists(PLUGIN_CONFIG_PATH)) {
    config = JSON.parse(File.readFrom(PLUGIN_CONFIG_PATH));
  } else dataconfig();
}
loadconfig();

let conf = new JsonConfigFile(PLUGIN_CONFIG_PATH);
let sf;
function fm(pl) {
  if (
    conf.get("ThirdServer")[0]["NAME"] != "" &&
    conf.get("SecondServer")[0]["NAME"] != "" &&
    conf.get("FirstServer")[0]["NAME"] != ""
  ) {
    sf = pl.sendSimpleForm(
      "跨服传送",
      "选择要传送的服务器",
      [
        conf.get("FirstServer")[0]["NAME"],
        conf.get("SecondServer")[0]["NAME"],
        conf.get("ThirdServer")[0]["NAME"],
      ],
      ["", "", ""],
      (Pl, id) => {
        switch (id) {
          case 0:
            Pl.transServer(
              conf.get("FirstServer")[0]["IP"],
              conf.get("FirstServer")[0]["PORT"]
            );
            break;
          case 2:
            Pl.transServer(
              conf.get("Seconderver")[0]["IP"],
              conf.get("SecoedServer")[0]["PORT"]
            );
            break;
          case 3:
            Pl.transServer(
              conf.get("ThirdServer")[0]["IP"],
              conf.get("ThirdServer")[0]["PORT"]
            );
            break;
        }
      }
    );
  } else if (
    conf.get("SecondServer")[0]["NAME"] != "" &&
    conf.get("FirstServer")[0]["NAME"] != ""
  ) {
    sf = pl.sendSimpleForm(
      "跨服传送",
      "选择要传送的服务器",
      [conf.get("FirstServer")[0]["NAME"], conf.get("SecondServer")[0]["NAME"]],
      ["", ""],
      (Pl, id) => {
        switch (id) {
          case 0:
            Pl.transServer(
              conf.get("FirstServer")[0]["IP"],
              conf.get("FirstServer")[0]["PORT"]
            );
            break;
          case 2:
            Pl.transServer(
              conf.get("Seconderver")[0]["IP"],
              conf.get("SecoedServer")[0]["PORT"]
            );
            break;
        }
      }
    );
  } else if (conf.get("FirstServer")[0]["NAME"] != "") {
    sf = pl.sendSimpleForm(
      "跨服传送",
      "选择要传送的服务器",
      [conf.get("FirstServer")[0]["NAME"]],
      [""],
      (Pl, id) => {
        switch (id) {
          case 0:
            Pl.transServer(
              conf.get("FirstServer")[0]["IP"],
              conf.get("FirstServer")[0]["PORT"]
            );
            break;
          case 2:
            Pl.transServer(
              conf.get("Seconderver")[0]["IP"],
              conf.get("SecoedServer")[0]["PORT"]
            );
            break;
        }
      }
    );
  } else if (sf == null) {
    pl.tell("[Transfer]插件配置错误");
  }
}

mc.listen("onServerStarted", () => {
  const cmd = mc.newCommand("transfer", "跨服传送", PermType.Any, 0x80);
  cmd.setAlias("tr");
  cmd.overload([]);
  cmd.setCallback((_cmd, _ori, out, res) => {
    fm(_ori.player);
  });
  cmd.setup();
});

ll.registerPlugin(PLUGIN_NAME, "跨服传送", PLUGIN_VERSION, {
  author: "xianyubb",
});
