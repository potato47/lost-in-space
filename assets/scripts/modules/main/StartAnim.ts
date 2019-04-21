const { ccclass, property } = cc._decorator;

@ccclass
export class StartAnim extends cc.Component {

    @property(cc.Node)
    frame1: cc.Node = null;
    @property(cc.Node)
    frame2: cc.Node = null;
    @property(cc.Node)
    frame3: cc.Node = null;
    @property(cc.Node)
    frame4: cc.Node = null;

    play(finish: Function) {
        this.node.active = true;
        this.scheduleOnce(() => {
            this.frame2.active = true;
            this.scheduleOnce(() => {
                this.frame3.active = true;
                this.schedule(() => {
                    this.frame3.active = !this.frame3.active;
                }, 0.2);
            }, 1);
            this.scheduleOnce(() => {
                this.frame1.active = false;
                this.frame2.active = false;
                this.frame3.active = false;
                this.frame4.active = true;
            }, 4);
        }, 1);
        this.scheduleOnce(() => {
            this.node.active = false;
            finish();
        }, 10);
    }
}