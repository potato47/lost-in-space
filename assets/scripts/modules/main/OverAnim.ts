const { ccclass, property } = cc._decorator;

@ccclass
export class OverAnim extends cc.Component {

    @property(cc.Node)
    topContainer: cc.Node = null;
    @property(cc.Node)
    bottomContainer: cc.Node = null;
    @property(cc.Node)
    win1: cc.Node = null;
    @property(cc.Node)
    win2: cc.Node = null;
    @property(cc.Node)
    lose1: cc.Node = null;
    @property(cc.Node)
    lose2: cc.Node = null;

    play(isWinner1: boolean, finish: Function) {
        this.node.active = true;
        if (isWinner1) {
            this.win2.active = true;
            this.win1.active = false;
            this.lose2.active = false;
            this.lose1.active = true;
        } else {
            this.win2.active = false;
            this.win1.active = true;
            this.lose2.active = true;
            this.lose1.active = false;
        }
        this.scheduleOnce(() => {
            // this.node.active = false;
            finish();
        }, 6);
    }
}