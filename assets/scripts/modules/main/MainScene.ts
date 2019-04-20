import { Player } from './Player';
import { BaseBlock } from './block/BaseBlock';
import { RoadManager } from './RoadManager';

const { ccclass, property } = cc._decorator;

@ccclass
export class MainScene extends cc.Component {

    @property(Player)
    player1: Player = null;
    @property(Player)
    player2: Player = null;
    @property(RoadManager)
    roadManager: RoadManager = null;

    onLoad() {
        cc.director.getCollisionManager().enabled = true;
        cc.director.getCollisionManager().enabledDebugDraw = true;
    }

    start() {
        this.addEventListeners();
        this.roadManager.init(this);
        this.startGame();
    }

    onDisable() {
        this.removeEventListeners();
    }

    startGame() {
        this.player1.run();
        this.player2.run();
    }

    overGame() {

    }

    onRoadInit(originLeftX: number, originRightX: number) {
        this.player1.node.parent.x = originLeftX + 220;
        this.player2.node.parent.x = originRightX - 220;
    }

    onKeyDown(event: cc.Event.EventKeyboard) {
        switch(event.keyCode) {
            case cc.macro.KEY.space:
                this.player1.jump();
                break;
            case cc.macro.KEY.enter:
                this.player2.jump();
                break;
        }
    }

    addEventListeners() {
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
    }

    removeEventListeners() {
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
    }
}