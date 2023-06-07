"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.conf = void 0;
exports.conf = new JsonConfigFile("./plugins//MysqlMoney//config.json");
exports.conf.init("connection", {
    host: "localhost",
    port: 3306,
    user: "root",
    password: "a12345678",
});
exports.conf.init("ScoreName", "money");
