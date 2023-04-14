// LiteLoader-AIDS automatic generated
/// <reference path="c:\Users\Administrator\.vscode/dts/HelperLib-master/src/index.d.ts"/>

import {
  PLUGIN_DESCRIPTION,
  PLUGIN_EXTRA,
  PLUGIN_NAME,
  PLUGIN_VERSION,
} from "./const";
import { name } from "./name";

logger.setTitle(PLUGIN_NAME);

logger.info(name);

ll.registerPlugin(
  PLUGIN_NAME,
  PLUGIN_DESCRIPTION,
  PLUGIN_VERSION,
  PLUGIN_EXTRA
);
