"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const const_1 = require("./const");
const name_1 = require("./name");
logger.setTitle(const_1.PLUGIN_NAME);
logger.info(name_1.name);
ll.registerPlugin(const_1.PLUGIN_NAME, const_1.PLUGIN_DESCRIPTION, const_1.PLUGIN_VERSION, const_1.PLUGIN_EXTRA);
