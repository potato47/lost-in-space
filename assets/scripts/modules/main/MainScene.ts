import { Player } from './Player';

const { ccclass, property } = cc._decorator;

@ccclass
export class MainScene extends cc.Component {

    @property(Player)
    player1: Player = null;
    @property(Player)
    player2: Player = null;

    start() {
        this.addEventListeners();
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