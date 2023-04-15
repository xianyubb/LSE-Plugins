// LiteLoader-AIDS automatic generated
/// <reference path="c:\Users\Administrator\.vscode/dts/HelperLib-master/src/index.d.ts"/>

import { coin } from "./conf&coin";
export function main(pl: Player | undefined) {
  let fma = mc.newSimpleForm();
  fma.setTitle("GuessWord");
  fma.setContent("请选择：");
  fma.addButton("Answer");
  fma.addButton("Look");
  pl?.sendForm(fma, (pl: Player | undefined, data) => {
    if (!data) {
      pl?.tell("关闭了表单");
    }
    switch (data) {
      case 0:
        Answer(pl, Money, times);
        break;
      case 1:
        Look(pl, Qu, Money, times);
        break;
    }
  });
}
//玩家菜单
export function Answer(pl: Player | undefined, coins: number, times: number) {
  let Af = mc.newCustomForm();
  Af.setTitle("GuessWord");
  Af.addInput("请输入答案", "(String)");
  pl?.sendForm(Af, (pl: Player | undefined, data) => {
    if (data) {
      if (data[0] === Answer && times > 0) {
        coin(pl, coins);
        times--;
      } else if (data[0] != Answer) {
        pl?.tell("答案不正确哦");
      } else if (times <= 0 || Number.isNaN(times)) {
        Qu = "默认";
        An = "默认";
        times = 0;
        Money = 0;
      }
    } else {
      pl?.tell("关闭了表单");
    }
  });
}
export function Look(
  pl: Player | undefined,
  Qu: string,
  coins: number,
  times: number
) {
  let Lf = mc.newCustomForm();
  Lf.setTitle("GuessWord");
  Lf.addLabel("当前问题为:" + Qu);
  Lf.addLabel("奖励金额:" + coins);
  Lf.addSwitch("打开回答表单", true);
  pl?.sendForm(Lf, (pl: Player | undefined, data) => {
    if (data) {
      if (data[2] === true) {
        Answer(pl, coins, times);
      } else {
        pl?.tell("关闭了表单");
      }
    }
  });
}

let Qu = "默认";
let An = "默认";
let times = 1;
let Money = 0;

export function mains(pl: Player | undefined) {
  let msf = mc.newSimpleForm();
  msf.setTitle("GuessWord");
  msf.setContent("请选择：");
  msf.addButton("Answer");
  msf.addButton("Look");
  pl?.sendForm(msf, (pl: Player | undefined, data) => {
    if (!data) {
      pl?.tell("关闭了表单");
    }
    switch (data) {
      case 0:
        Setting(pl);
        break;
      case 1:
        Looks(pl, Qu, An, times, Money);
        break;
    }
  });
}

export function Looks(
  pl: Player | undefined,
  Qu: string,
  An: String,
  times: number,
  coins: number
) {
  let Lsf = mc.newCustomForm();
  Lsf.setTitle("GuessWord");
  Lsf.addLabel("当前问题为:" + Qu);
  Lsf.addLabel("问题答案:" + An);
  Lsf.addLabel("剩余回答次数:" + times);
  Lsf.addLabel("奖励金额:" + coins);
  Lsf.addSwitch("打开设置表单", true);
  pl?.sendForm(Lsf, (pl: Player | undefined, data) => {
    if (data) {
      if (data[4] === true) {
        Setting(pl);
      } else {
        pl?.tell("关闭了表单");
      }
    }
  });
}
export function Setting(pl: Player | undefined) {
  let Sf = mc.newCustomForm();
  Sf.setTitle("GuessWord");
  Sf.addLabel("请填写以下配置：");
  Sf.addInput("问题:", "(String)");
  Sf.addInput("问题答案:", "(String)");
  Sf.addInput("可用次数:", "请输入大于0的整数");
  Sf.addInput("奖励金额:", "请输入整数");
  pl?.sendForm(Sf, (pl: Player | undefined, data) => {
    if (data) {
      Qu = data[1];
      An = data[2];
      times = parseInt(data[3]);
      Money = parseInt(data[4]);
      mc.broadcast("[GuessWord]管理员发布了问题:\n" + data[1]);
    } else {
      pl?.tell("关闭了表单");
    }
  });
}
