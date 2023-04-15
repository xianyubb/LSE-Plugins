// LiteLoader-AIDS automatic generated
/// <reference path="c:\Users\Administrator\.vscode/dts/HelperLib-master/src/index.d.ts"/>

import { Qu, coins } from "./index";
import { coin } from "./conf&coin";
export function main(pl: Player | undefined) {
  let fma = mc.newSimpleForm();
  fma.setTitle("GuessWord");
  fma.setContent("请选择：");
  fma.addButton("Answer");
  fma.addButton("Look");
  pl?.sendForm(fma, (pl: Player | undefined, data) => {
    switch (data) {
      case 0:
        Answer(pl, coins);
        break;
      case 1:
        Look(pl, Qu, coins);
        break;
    }
  });
}
//玩家菜单
export function Answer(pl: Player | undefined, coins: number) {
  let Af = mc.newCustomForm();
  Af.setTitle("GuessWord");
  Af.addInput("请输入答案", "(String)");
  pl?.sendForm(Af, (pl: Player | undefined, data) => {
    if (data) {
      if (data[0] === Answer) {
        coin(pl, coins);
      }
    }
  });
}
export function Look(
  pl: Player | undefined,
  Qu: String | undefined,
  coins: number
) {
  let Lf = mc.newCustomForm();
  Lf.setTitle("GuessWord");
  Lf.addLabel("当前问题为:" + Qu);
  Lf.addLabel("奖励金额:" + coins);
  Lf.addSwitch("打开回答表单", true);
  pl?.sendForm(Lf, (pl: Player | undefined, data) => {
    if (data) {
      if (data[2] === true) {
        Answer(pl, coins);
      }
    }
  });
}
//管理员表单