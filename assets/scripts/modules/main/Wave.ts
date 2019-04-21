const { ccclass, property } = cc._decorator;

@ccclass
export class Wave extends cc.Component {

    @property(cc.Integer)
    speed: number = 800;
    @property(cc.Integer)
    totalDistance: number = 1500;

    dir = 0;
    finishCb: Function;
    startX: number = 0;

    shot(dir: number, finish: Function) {
        this.dir = dir;
        this.finishCb = finish;
        this.startX = this.node.x;
    }

    onCollisionEnter(other: cc.Collider, self: cc.Collider) {
        if (other.tag === 233) {
            this.finishCb(this.node);
            // let backAction = cc.moveBy(2, -200 * this.dir, 0);
            // let finish = cc.callFunc(() => {
            //     cc.log('finish');
            //     this.finishCb(this.node);
            // });
            // this.node.runAction(cc.sequence(backAction, finish));
        }
    }

    update(dt: number) {
        if (this.dir !== 0) {
            this.node.x += this.speed * dt * this.dir;
            if (this.node.x - this.startX >= this.totalDistance) {
                this.finishCb(this.node);
            }
        }
    }
}