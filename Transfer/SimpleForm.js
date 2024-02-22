/**
 * 按钮表单
 */
export class XYSimpleForm {
    /**
     * @constructor
     * @param title 表单标题
     * @param content 表单内容
     * @param player 要发送表单的玩家
     */
    constructor(title, content, player) {
        this.ButtonList = [];
        this.player = player;
        this.form = mc.newSimpleForm();
        this.form.setTitle(title).setContent(content);
    }
    /**
     * 添加一个按钮
     * @param text 按钮显示文字
     * @param Callback 按钮回调函数
     */
    addButton(text, Callback) {
        this.ButtonList.push({
            text,
            Callback
        });
        this.form.addButton(text);
        return this;
    }
    /**
     * 发送表单
     */
    send() {
        this.player.sendForm(this.form, (player, id) => {
            if (id === null)
                return;
            this.ButtonList[id].Callback(player);
        });
    }
}
