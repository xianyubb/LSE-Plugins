"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dataPath = exports.PLUGIN_EXTRA = exports.PLUGIN_DESCRIPTION = exports.PLUGIN_VERSION = exports.PLUGIN_NAME = void 0;
const fs_1 = require("fs");
const path_1 = require("path");
const package_json_1 = require("../package.json");
exports.PLUGIN_NAME = "GuessWord";
exports.PLUGIN_VERSION = (package_json_1.version.split(".").map((v) => Number(v)));
exports.PLUGIN_DESCRIPTION = package_json_1.description;
exports.PLUGIN_EXTRA = { Author: "xianyubb" };
exports.dataPath = (0, path_1.join)("./plugins", exports.PLUGIN_NAME);
if (!(0, fs_1.existsSync)(exports.dataPath))
    (0, fs_1.mkdirSync)(exports.dataPath);
