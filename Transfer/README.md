# Transfer-跨服传送

## 声明

### 本插件基于 LSE 开发

## 加载

首先将下载的 `Transfer.zip` 文件 解压到 `path\to\bds\plugins` 下

将整个文件夹拖进去即可

如下

```filetree
/plugins
|  /Transfer // 文件夹
|    /Transfer.js
|    /CustomForm.js
|    /SimpleForm.js
|    /manifest.json
```

## 使用

第一次加载会在同插件的文件夹下生成 `config.json`

他的样子是这样的

```json
{
    "MotdIP": "127.0.0.1", // Motd 的服务器IP
    "MotdPort": 8080, // Motd 的服务器端口
    "Servers": [ // 你要传送的 Server 列表
        {
            "Name": "server1",
            "IP": "127.0.0.1",
            "Port": 19132
        }
        // 想要再添加一个要传送的服务器也很简单
        // , { // 千万不要忘了这里的英文逗号
        //     "Name": "server1",
        //     "IP": "127.0.0.1",
        //     "Port": 19132
        // }
    ]
}
```

## 命令

- `/tf` 直接输入打开跨服传送表单
- `/tf <Server: string> [Port: int]` 传送到目标服务器
  - 必选参数 Server 目标服务器IP 类型字符串 例如 "127.0.0.1"
  - 可选参数 Port 目标服务器端口 类型整数 例如 19132 默认值 19132

> 以上命令玩家成员权限即可执行,非玩家不可执行

## 使用图示

Please go to Minebbs

## 其他信息

Author: xianyubb

### Bug 反馈

QQ: 2149656630

QQGroup: 865286891

GithubIssues: `https://github.com/xianyubb/LLSE-Plugins`
