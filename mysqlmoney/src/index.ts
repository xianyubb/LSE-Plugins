import * as mysql from "mysql";
import { conf } from "./conf";
import { error } from "console";

let connection = mysql.createConnection(conf.get("connection"));

connection.connect((err, result) => {
  if (err) {
    console.error("连接失败，请检查配置文件");
  }
  console.log(`连接成功。连接id为${connection.threadId}`);
});

let ScoreName = conf.get("ScoreName");

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
