"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Look = exports.Answer = exports.main = void 0;
const index_1 = require("./index");
const conf_coin_1 = require("./conf&coin");
function main(pl) {
    let fma = mc.newSimpleForm();
    fma.setTitle("GuessWord");
    fma.setContent("请选择：");
    fma.addButton("Answer");
    fma.addButton("Look");
    pl?.sendForm(fma, (pl, data) => {
        switch (data) {
            case 0:
                Answer(pl, index_1.coins);
                break;
            case 1:
                Look(pl, index_1.Qu, index_1.coins);
                break;
        }
    });
}
exports.main = main;
function Answer(pl, coins) {
    let Af = mc.newCustomForm();
    Af.setTitle("GuessWord");
    Af.addInput("请输入答案", "(String)");
    pl?.sendForm(Af, (pl, data) => {
        if (data) {
            if (data[0] === Answer) {
                (0, conf_coin_1.coin)(pl, coins);
            }
        }
    });
}
exports.Answer = Answer;
function Look(pl, Qu, coins) {
    let Lf = mc.newCustomForm();
    Lf.setTitle("GuessWord");
    Lf.addLabel("当前问题为:" + Qu);
    Lf.addLabel("奖励金额:" + coins);
    Lf.addSwitch("打开回答表单", true);
    pl?.sendForm(Lf, (pl, data) => {
        if (data) {
            if (data[2] === true) {
                Answer(pl, coins);
            }
        }
    });
}
exports.Look = Look;
