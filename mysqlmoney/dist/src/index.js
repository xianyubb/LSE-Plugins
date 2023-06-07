"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mysql = __importStar(require("mysql"));
const conf_1 = require("./conf");
let connection = mysql.createConnection(conf_1.conf.get("connection"));
connection.connect((err, result) => {
    if (err) {
        console.error("连接失败，请检查配置文件");
    }
    console.log(`连接成功。连接id为${connection.threadId}`);
});
let ScoreName = conf_1.conf.get("ScoreName");
connection.query(`create database ${ScoreName}`, (err, result) => {
    if (err) {
        console.error("表生成错误" + err);
        return;
    }
    console.log(result);
});
connection.query(`use ${ScoreName}`, (err, result) => {
    if (err) {
        console.error("进入失败");
        return;
    }
    console.log(result);
});
