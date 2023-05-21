"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.date = exports.config = void 0;
exports.config = new JsonConfigFile("./plugins/Genshin/config.json");
exports.date = new JsonConfigFile("./plugins/Genshin/date.json");
exports.config.init("cookie", "");
