import { Player } from './Player';
import { RoadManager } from './RoadManager';
import { StartAnim } from './StartAnim';
import { OverAnim } from './OverAnim';

const { ccclass, property } = cc._decorator;

@ccclass
export class MainScene extends cc.Component {

    @property(Player)
    player1: Player = null;
    @property(Player)
    player2: Player = null;
    @property(RoadManager)
    roadManager: RoadManager = null;
    @property({
        type: cc.AudioClip
    })
    audioClip1: cc.AudioClip = null;
    @property({
        type: cc.AudioClip
    })
    audioClip2: cc.AudioClip = null;
    @property(StartAnim)
    startAnim: StartAnim = null;
    @property(OverAnim)
    overAnim: OverAnim = null;

    onLoad() {
        cc.director.getCollisionManager().enabled = true;
    }

    start() {
        this.addEventListeners();
        this.roadManager.init(this);
        this.player1.init(this, this.roadManager.getHalfDistance());
        this.player2.init(this, this.roadManager.getHalfDistance());
        this.startAnim.play(() => {
            this.startGame();
        });
    }

    onDisable() {
        this.removeEventListeners();
    }

    startGame() {
        this.player1.run();
        this.player2.run();
        this.playFirstBgm();
    }

    speak(worldPos: cc.Vec2, dir) {

    }

    playSecondBgm() {
        cc.audioEngine.play(this.audioClip2, true, 1);

    }

    playFirstBgm() {
        cc.audioEngine.play(this.audioClip1, true, 1);
    }

    overGame() {
        this.player1.stop();
        this.player2.stop();
        this.overAnim.play(() => {
            cc.log('over');
        });
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
            case cc.macro.KEY.a:
                this.player1.shot();
                break;
            case cc.macro.KEY.enter:
                this.player2.jump();
                break;
            case cc.macro.KEY.l:
                this.player2.shot();
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