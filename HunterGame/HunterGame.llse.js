// LiteLoader-AIDS automatic generated
/// <reference path="../HelperLib/src/index.d.ts"/>

const PLUGIN_NAME = "HunterGame";
ll.registerPlugin(
  /* name */ PLUGIN_NAME,
  /* introduction */ "猎人游戏",
  /* version */ [0, 3, 0],
  /* otherInformation */ {
    author: "xianyubb",
    QQgroup: "865286891",
  }
);

let lang = new JsonConfigFile(`.\\plugins\\${PLUGIN_NAME}\\lang.json`);

lang.init("zh_CN", {
  Plugin_name: "猎人游戏",
  Open_game_set_form: "打开游戏设置表单",
  Successful_massage1: "游戏结束,猎人胜利!!!",
  Successful_massage2: "游戏结束,玩家{1}胜利!!!",
  Game_preparation_phase: "游戏准备阶段",
  Start_game_massage1: "开始游戏!",
  Start_game_massage2: "开始追逐{1}吧",
  GameStatus_massage: "游戏正在进行中,无法再次开始游戏",
  Game_player: "当前游戏人数/最多人数: {1} / {2}",
  Already_join_game: "你已经加入了游戏，无法再次加入!",
  Start_game_massage3: "已满足最少人数要求，即将在30秒后开始游戏!",
  Cant_stop_game_massage: "您无法结束游戏!",
  Start_game_massage4: "即将在 {1} 秒后开始游戏",
  Min_player: "设置最少游戏人数",
  Max_player: "设置最多游戏人数",
  Single_game_time: "设置单场游戏时长",
  Create_house: "创建房间",
  Manage_my_house: "管理我的房间",
  House_list: "房间列表",
  Form_content1: "请选择...",
  House_full: "房间已满，无法创建新房间",
  House_name: "设置房间名",
  House_massage: "查看家信息",
  Form_stoped: "关闭了表单",
  Set_compete_massage: "设置完成",
  House_name2: "房间名 : {1}",
  House_min_player: "游戏最少人数 : {1}",
  House_max_player: "游戏最多人数 : {1}",
  House_game_time: "游戏时长 : {1}",
  House_player: "当前房间玩家 : {1}",
});

let conf = new JsonConfigFile(`.\\plugins\\${PLUGIN_NAME}\\config.json`);
conf.init("language", "zh_CN"); // 插件语言设置
conf.init("ServerMaxHouse", 3); // 服务器最多游戏房间

let Gamedata = new JsonConfigFile(
  `.\\plugins\\${PLUGIN_NAME}\\Gamedata.json`,
  "{}"
);

/*
// 拟定房间数据
｛
   0: {
        creator:string,
        name:string,
        minplayer:number,
        maxplayer:numbe,
        gametime:number,
        gameplayer:string[],
        gamestutas:boolean
    }
｝
*/

/**
 * 从lang文件读取并处理
 * @param {string} key 键名
 * @param {string | undefined} value 变量
 * @returns {string} 处理后的字符串
 */
function XT(key, value) {
  return lang.get(conf.get("language"))[key].replace("{1}", value);
}

/**
 * 玩家表单1
 * @param {Player} Player 玩家对象
 */
function PlayerForm1(Player) {
  let pf1 = mc.newSimpleForm();
  pf1.setTitle(XT("Plugin_name"));
  pf1.addButton(XT("Create_house"));
  pf1.addButton(XT("Manage_my_house"));
  pf1.addButton(XT("House_list"));
  Player.sendForm(pf1, (pl, id) => {
    if (id != null) {
      switch (id) {
        case 0:
          if (
            Object.keys(JSON.parse(Gamedata.read())).length <
            conf.get("ServerMaxHouse")
          ) {
            CreateHouse(pl);
          } else {
            pl.tell(XT("House_full"));
          }
          break;
        case 1:
          ManageHouse1(pl);
          break;
        case 2:
          break;
      }
    }
  });
}

/**
 * 读取房间
 * @param {number} id 房间id
 * @returns {} 房间对象
 */
function GetHouse(id) {
  return Gamedata.get(String(id));
}

class House {
  /**
   * 房间类
   * @param {{
   * creator:string,
   * name:string,
   * minplayer:number,
   * maxplayer:number,
   * gametime:number,
   * gameplayer:string[],
   * gamestatus:boolean
   * }} house 房间对象
   */
  constructor(house) {
    this.house = house;
  }
  /**
   * 设置房间名
   * @param {string} name
   */
  setname(name) {
    this.house.name = name;
    return this.house;
  }
  /**
   * 设置房间最少人数
   * @param {number} plnum 玩家数量
   */
  setminplayer(plnum) {
    this.house.minplayer = plnum;
    return this.house;
  }
  /**
   * 设置房间最多人数
   * @param {number} plnum 玩家数量
   */
  setmaxplayer(plnum) {
    this.house.maxplayer = plnum;
    return this.house;
  }
  /**
   * 设置游戏时长
   * @param {number} time 游戏时长 单位分钟
   */
  setGametime(time) {
    this.house.gametime = time;
    return this.house;
  }
  /**
   * 查看房间玩家
   */
  get lookplayer() {
    return this.gameplayer.join(",");
  }
  /**
   * 设置房间状态
   * @param {boolean} status 状态
   */
  setStatus(status) {
    this.house.gamestatus = status;
    return this.house;
  }
}

/**
 * 管理房间
 * @param {Player} player 玩家
 */
function ManageHouse1(player) {
  let mf = mc.newSimpleForm();
  mf.setTitle(XT("Plugin_name"));
  mf.setContent(XT("Form_content1"));
  let index;
  let gamedata = Gamedata.read();
  if (player.isOP()) {
    for (const key in JSON.parse(gamedata)) {
      if (Object.hasOwnProperty.call(JSON.parse(gamedata), key)) {
        const element = JSON.parse(gamedata)[key];
        mf.addButton(element.name);
      }
    }
  } else {
    for (const key in JSON.parse(gamedata)) {
      if (Object.hasOwnProperty.call(JSON.parse(gamedata), key)) {
        const element = JSON.parse(gamedata)[key];
        if (element.creator === player.name) {
          mf.addButton(element.name);
        }
      }
    }
  }
  player.sendForm(mf, (pl, id) => {
    if (id != null) {
      ManageHouse2(pl, id);
    }
  });
}
/**
 * 管理房间详细设置
 * @param {Player} player 玩家
 * @param {number} house_id 房间id
 */
function ManageHouse2(player, house_id) {
  let house = new House(GetHouse(house_id));
  let cf = mc.newCustomForm();
  cf.setTitle(XT("Plugin_name"));
  let mf = mc.newSimpleForm();
  mf.setTitle(XT("Plugin_name"));
  mf.setContent(XT("Form_content1"));
  mf.addButton(XT("House_name"));
  mf.addButton(XT("Min_player"));
  mf.addButton(XT("Max_player"));
  mf.addButton(XT("Single_game_time"));
  mf.addButton(XT("House_massage"));
  player.sendForm(mf, (pl, id) => {
    switch (id) {
      case 0:
        cf.addInput(XT("House_name"));
        pl.sendForm(cf, (Player, data) => {
          if (data) {
            HouseData(house_id, house.setname(data[0]));
            Player.tell(XT("Set_compete_massage"));
            ManageHouse2(Player, house_id);
          } else {
            Player.tell(XT("Form_stoped"));
          }
        });
        break;
      case 1:
        cf.addInput(XT("Min_player"));
        player.sendForm(cf, (Player, data) => {
          if (data) {
            HouseData(house_id, house.setminplayer(Number(data[0])));
            Player.tell(XT("Set_compete_massage"));
            ManageHouse2(Player, house_id);
          } else {
            Player.tell(XT("Form_stoped"));
          }
        });
        break;
      case 2:
        cf.addInput(XT("Max_player"));
        player.sendForm(cf, (Player, data) => {
          if (data) {
            HouseData(house_id, house.setmaxplayer(Number(data[0])));
            Player.tell(XT("Set_compete_massage"));
          } else {
            Player.tell(XT("Form_stoped"));
          }
        });
        break;
      case 3:
        cf.addInput(XT("Single_game_time"));
        player.sendForm(cf, (Player, data) => {
          if (data) {
            HouseData(house_id, house.setGametime(Number(data[0])));
            Player.tell(XT("Set_compete_massage"));
            ManageHouse2(Player, house_id);
          } else {
            Player.tell(XT("Form_stoped"));
          }
        });
        break;
      case 4:
        cf.addLabel(XT("House_name2", house.house.name));
        cf.addLabel(XT("House_min_player", `${house.house.minplayer}`));
        cf.addLabel(XT("House_max_player", ` ${house.house.minplayer}`));
        cf.addLabel(XT("House_game_time", `${house.house.gametime}`));
        cf.addLabel(XT("House_player", house.lookplayer));
        player.sendForm(cf, (Player, data) => {
          if (data) {
          } else {
            Player.tell(XT("Form_stoped"));
          }
        });
        break;
    }
  });
}
/**
 * 修改housedata(采用了最笨的方法...，以后会尝试优化)
 * @param {number} house_id 删除的数据位置
 * @param {} housedata 修改后的数据
 */
function HouseData(house_id, housedata) {
  Gamedata.set(String(house_id), housedata);
}

/**
 *
 * @param {Player} Player 玩家
 */
function CreateHouse(Player) {
  let newhouse = {
    creator: Player.name,
    name: "house_name",
    minplayer: 1,
    maxplayer: 4,
    gametime: 30,
    gameplayer: [Player.name],
    gamestatus: false,
  };
  for (let i = 0; i < conf.get("ServerMaxHouse"); i++) {
    if (Gamedata.get(String(i)) == null) {
      Gamedata.set(String(i), newhouse);
      break;
    }
  }
}

let hg = mc.newCommand("huntergame", XT("Plugin_name"), PermType.Any);
hg.setAlias("hg");
hg.setEnum("op", ["op"]);
hg.optional("op", ParamType.Enum, "op");
hg.overload(["op"]);
hg.setCallback((_cmd, _ori, out, res) => {
  PlayerForm1(_ori.player);
});
hg.setup();
