const { ccclass, property } = cc._decorator;

@ccclass
export class OverAnim extends cc.Component {

    play(finish: Function) {
        this.node.active = true;
        this.scheduleOnce(() => {
            // this.node.active = false;
            finish();
        }, 6);
    }
}