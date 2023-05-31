import * as mysql from "mysql";
import { conf } from "./conf";

let connection = mysql.createConnection(conf.get("connection"));

connection.connect((err, result) => {
  if (err) {
    console.error("连接失败，请检查配置文件");
  }
  console.log(`连接成功。连接id为${connection.threadId}`);
});

