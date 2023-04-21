"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Setting = exports.Looks = exports.mains = exports.Money = exports.times = exports.An = exports.Qu = exports.Look = exports.Answer = exports.main = void 0;
const conf_coin_1 = require("./conf&coin");
function main(pl, Money, times) {
    let fma = mc.newSimpleForm();
    fma.setTitle("GuessWord");
    fma.setContent("请选择：");
    fma.addButton("Answer");
    fma.addButton("Look");
    pl?.sendForm(fma, (pl, data) => {
        if (data == 0 || 1) {
            switch (data) {
                case 0:
                    Answer(pl, Money, times);
                    break;
                case 1:
                    Look(pl, exports.Qu, Money, times);
                    break;
            }
        }
        else {
            pl?.tell("关闭了表单");
        }
    });
}
exports.main = main;
function Answer(pl, coins, time) {
    let Af = mc.newCustomForm();
    Af.setTitle("GuessWord");
    Af.addInput("请输入答案", "(String)");
    pl?.sendForm(Af, (pl, data) => {
        if (data) {
            if (data[0] == exports.An && exports.times > 0) {
                (0, conf_coin_1.coin)(pl, coins);
                exports.times = time--;
                log(data, exports.times);
                pl?.tell("回答正确");
            }
            else if (data[0] != exports.An) {
                pl?.tell("答案不正确或者回答次数为0");
            }
        }
        else {
            pl?.tell("关闭了表单");
        }
    });
}
exports.Answer = Answer;
function Look(pl, Qu, coins, times) {
    let Lf = mc.newCustomForm();
    Lf.setTitle("GuessWord");
    Lf.addLabel("当前问题为:" + Qu);
    Lf.addLabel("奖励金额:" + coins);
    Lf.addSwitch("打开回答表单", true);
    pl?.sendForm(Lf, (pl, data) => {
        if (data) {
            if (data[2] === true) {
                Answer(pl, coins, times);
            }
        }
        else {
            pl?.tell("关闭了表单");
        }
    });
}
exports.Look = Look;
exports.Qu = "默认", exports.An = "默认", exports.times = 1, exports.Money = 0;
function mains(pl) {
    let msf = mc.newSimpleForm();
    msf.setTitle("GuessWord");
    msf.setContent("请选择：");
    msf.addButton("Setting");
    msf.addButton("Looks");
    pl?.sendForm(msf, (pl, data) => {
        if (data == 0 || 1) {
            switch (data) {
                case 0:
                    Setting(pl);
                    break;
                case 1:
                    Looks(pl, exports.Qu, exports.An, exports.times, exports.Money);
                    break;
            }
        }
        else {
            pl?.tell("关闭了表单");
        }
    });
}
exports.mains = mains;
function Looks(pl, Qu, An, times, coins) {
    let Lsf = mc.newCustomForm();
    Lsf.setTitle("GuessWord");
    Lsf.addLabel("当前问题为:" + Qu);
    Lsf.addLabel("问题答案:" + An);
    Lsf.addLabel("剩余回答次数:" + times);
    Lsf.addLabel("奖励金额:" + coins);
    Lsf.addSwitch("打开设置表单", true);
    pl?.sendForm(Lsf, (pl, data) => {
        if (data) {
            if (data[4] === true) {
                Setting(pl);
            }
        }
        else {
            pl?.tell("关闭了表单");
        }
    });
}
exports.Looks = Looks;
function Setting(pl) {
    let Sf = mc.newCustomForm();
    Sf.setTitle("GuessWord");
    Sf.addLabel("请填写以下配置：");
    Sf.addInput("问题:", "(String)");
    Sf.addInput("问题答案:", "(String)");
    Sf.addInput("可用次数:", "请输入大于0的整数");
    Sf.addInput("奖励金额:", "请输入整数");
    pl?.sendForm(Sf, (pl, data) => {
        if (data) {
            exports.Qu = data[1];
            exports.An = data[2];
            exports.times = parseInt(data[3]);
            exports.Money = parseInt(data[4]);
            mc.broadcast("[GuessWord]管理员发布了问题:\n" + data[1]);
        }
        else {
            pl?.tell("关闭了表单");
        }
    });
}
exports.Setting = Setting;
