import { NextFSM } from '../../libs/NextFSM';

const { ccclass, property } = cc._decorator;

enum STATE {
    NONE, RUN, JUMP1, JUMP2
}

@ccclass
export class Player extends cc.Component {

    @property(cc.Integer)
    dir: number = 1;
    @property(cc.Integer)
    speedX: number = 100;
    @property(cc.Integer)
    jumpSpeed: number = 200;
    @property(cc.Integer)
    gravity: number = 10;
    @property(cc.Camera)
    camera: cc.Camera = null;

    speedY: number = 0;

    private fsm: NextFSM = new NextFSM({
        [STATE.NONE]: {
            to: [STATE.RUN]
        },
        [STATE.RUN]: {
            to: [STATE.JUMP1],
            enter: this.onEnterRun
        },
        [STATE.JUMP1]: {
            to: [STATE.JUMP2, STATE.RUN],
            enter: this.onEnterJump1
        },
        [STATE.JUMP2]: {
            to: [STATE.RUN],
            enter: this.onEnterJump2
        }
    }, STATE.NONE, this);

    run() {
        this.fsm.setState(STATE.RUN)
    }

    jump() {
        if (this.fsm.canTo(STATE.JUMP1)) {
            this.fsm.setState(STATE.JUMP1);
        } else if (this.fsm.canTo(STATE.JUMP2)) {
            this.fsm.setState(STATE.JUMP2)
        }
    }

    onEnterRun() {
        this.node.y = 0;
        this.speedY = 0;
    }

    onEnterJump1() {
        this.speedY = this.jumpSpeed;
    }

    onEnterJump2() {
        this.speedY = this.jumpSpeed;
    }

    update(dt: number) {
        let state = this.fsm.getState();
        if (state !== STATE.NONE) {
            if (state !== STATE.RUN) {
                this.speedY -= this.gravity * dt;
                this.node.y += this.speedY * dt;
                if (this.node.y <= 0) {
                    this.fsm.setState(STATE.RUN);
                }
            }
            let offsetX = this.speedX * dt * this.dir
            this.node.x += offsetX;
            this.camera.node.x += offsetX;
        }
    }


}