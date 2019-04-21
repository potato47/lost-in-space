const { ccclass, property } = cc._decorator;

@ccclass
export class LoadingScene extends cc.Component {

    start() {
        this.node.on(cc.Node.EventType.TOUCH_END, this.onBtnStart, this);
    }

    onBtnStart() {
        cc.director.loadScene('main');
    }
}
