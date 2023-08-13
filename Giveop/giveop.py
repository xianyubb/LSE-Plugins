
import typing

if typing.TYPE_CHECKING: # Important !
    from llpy import *


ll.registerPlugin(
    "giveop", # name
    "给予op", # introduction
    [0, 0, 1, Version.Release],
    {"Author": "xianyubb"}, # other_information
)
## LiteLoader-AIDS automatic generated

conf = JsonConfigFile(".\\plugins\\Giveop\\config.json","{}")

conf.init("key","114514")

key = mc.newCommand("key","给予op",PermType.Any,0x80)
key.mandatory("key",ParamType.RawText)
key.overload(["key"])
@key.handle
def _(_,_ori:LLSE_CommandOrigin,out:LLSE_CommandOutput,res:dict[str,any]):
    if (_ori.player):
        if(res.key== conf.get("key")):
            _ori.player.setPermLevel(1)
            out.success("你已被给予管理员权限！")
        else:
            out.success("密码没对哦")
    else :
        out.error("nnd你要给控制台管理员权限吗！")

key.setup()