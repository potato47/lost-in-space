import { BaseBlock } from './block/BaseBlock';

const { ccclass, property } = cc._decorator;

@ccclass
export class PlayerCollider extends cc.Component {

    onCollisionEnter(other: cc.Collider, self: cc.Collider) {
        cc.log(other.tag);
        if (other.tag === 233) {
            other.node.parent.getComponent(BaseBlock).showBlood();
        }
    }
}