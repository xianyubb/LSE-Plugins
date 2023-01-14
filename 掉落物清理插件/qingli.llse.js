//LiteLoaderScript Dev Helper
/// <reference path="c:\Users\Administrator\.vscode/dts/llaids/src/index.d.ts"/> 

ll.registerPlugin(
    /* name */ "qingli",
    /* introduction */ "qingli",
    /* version */ [0,0,1],
    /* otherInformation */ {}
); 



mc.listen("onServerStarted", () => {
    mc.regPlayerCmd("cl", "清理掉落物", function(pl, args){
        pl.tell("执行成功")
    }, 1)
});


mc.listen("onPlayerCmd", (Player, [cl]) => {
    var a = mc.getAllEntities();
    var b = a.length;
    var c = a.length;
    log(b);
    if (b > 10) {
        mc.runcmd("kill @e[type=item]");
        mc.runcmd(`say §4§l已清理完成,共清理${b}个落物`);
    }
}
);


