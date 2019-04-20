import { BaseBlock } from './block/BaseBlock';
import { MainScene } from './MainScene';
import { Player } from './Player';

const { ccclass, property } = cc._decorator;

@ccclass
export class PlayerCollider extends cc.Component {

    onCollisionEnter(other: cc.Collider, self: cc.Collider) {
        if (other.tag === 233) {
            other.node.parent.getComponent(BaseBlock).showBlood();
            this.node.parent.getComponent(Player).die();
        }
    }
}