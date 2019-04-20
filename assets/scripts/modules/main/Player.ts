import { NextFSM } from '../../libs/NextFSM';

const { ccclass, property } = cc._decorator;

enum STATE {
    NONE, RUN, JUMP, DASH, DROP, DIE
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
    @property(cc.Integer)
    width: number = 10000;
    @property(cc.Integer)
    dashLength: number = 200;
    @property(cc.Animation)
    animation: cc.Animation = null;
    @property(cc.Node)
    streakNode: cc.Node = null;
    @property(cc.Prefab)
    wavePrefab: cc.Prefab = null;

    speedY: number = 0;
    dashOrigin: cc.Vec2 = cc.Vec2.ZERO;
    wavePool: cc.NodePool;

    private fsm: NextFSM = new NextFSM({
        [STATE.NONE]: {
            to: [STATE.RUN]
        },
        [STATE.RUN]: {
            to: [STATE.JUMP, STATE.DIE],
            enter: this.onEnterRun
        },
        [STATE.JUMP]: {
            to: [STATE.DASH, STATE.RUN, STATE.DIE],
            enter: this.onEnterJump
        },
        [STATE.DASH]: {
            to: [STATE.DROP, STATE.DIE],
            enter: this.onEnterDash,
            exit: this.onExitDash
        },
        [STATE.DROP]: {
            to: [STATE.NONE, STATE.RUN, STATE.DIE],
            enter: this.onEnterDrop
        },
        [STATE.DIE]: {
            to: [STATE.RUN],
            enter: this.onEnterDie
        }
    }, STATE.NONE, this);

    init() {
        this.initWavePool();
    }

    initWavePool() {
        this.wavePool = new cc.NodePool();
        for (let i = 0; i < 8; i++) {
            this.wavePool.put(cc.instantiate(this.wavePrefab));
        }
    }

    createWaveNode() {
        let node: cc.Node = null;
        if (this.wavePool.size() > 0) {
            node = this.wavePool.get();
        } else {
            node = cc.instantiate(this.wavePrefab);
        }
        node.position = cc.v2(0, 0);
        node.scaleX = this.dir;
        return node;
    }

    run() {
        this.fsm.setState(STATE.RUN)
    }

    die() {
        this.fsm.setState(STATE.DIE);
    }

    jump() {
        if (this.fsm.canTo(STATE.JUMP)) {
            this.fsm.setState(STATE.JUMP);
        } else if (this.fsm.canTo(STATE.DASH)) {
            this.fsm.setState(STATE.DASH)
        }
    }

    shot() {
        let shotAction = cc.moveBy(2, 2000 * this.dir, 0);
        for (let i = 0; i < 5; i++) {
            let waveNode = this.createWaveNode();
            this.node.addChild(waveNode);
            // waveNode.position = this.node.position;
            waveNode.runAction(cc.sequence(shotAction, cc.callFunc(() => {
                this.onWaveNodeRecycle(waveNode);
            }, this)));
        }
    }

    onWaveNodeRecycle(node: cc.Node) {
        this.wavePool.put(node);
    }

    relive() {
        console.log("restart");
        if (this.dir === 1) {
            let delta = 0 - this.node.x;
            this.camera.node.x += delta;
            this.node.x += delta;               
        } else {
            let delta = 0 - this.node.x;
            this.camera.node.x += delta;
            this.node.x += delta;         
        }
        this.fsm.setState(STATE.RUN)
    }

    showStreak() {
        this.streakNode.active = true;
    }

    hideStreak() {
        this.streakNode.active = false;
    }

    onEnterRun() {
        this.animation.play('run');
        this.node.y = 0;
        this.speedY = 0;
    }

    onEnterJump() {
        this.speedY = this.jumpSpeed;
    }

    onEnterDash() {
        this.speedX *= 5;
        this.dashOrigin = this.node.position;
        this.showStreak();
    }

    onExitDash() {
        this.speedX /= 5;
        this.hideStreak();
    }

    onEnterDrop() {
        this.speedY = 0;
    }

    onEnterDie() {
        this.animation.play('die');
    }

    update(dt: number) {
        let state = this.fsm.getState();
        if (state !== STATE.NONE && state !== STATE.DIE) {
            if (state === STATE.JUMP || state === STATE.DROP) {
                this.speedY -= this.gravity * dt;
                this.node.y += this.speedY * dt;
                if (this.node.y <= 0) {
                    this.fsm.setState(STATE.RUN);
                }
            } else if(state === STATE.DASH) {
                if ((this.node.x - this.dashOrigin.x) * this.dir >= this.dashLength) {
                    this.fsm.setState(STATE.DROP);
                }
            }
            let offsetX = this.speedX * dt * this.dir
            this.node.x += offsetX;
            this.camera.node.x += offsetX;
        }
    }
}