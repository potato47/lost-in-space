import { BaseBlock } from './BaseBlock';
import { MathHelper } from '../../../utils/MathHelper';

const { ccclass, property } = cc._decorator;

@ccclass
export class Block1 extends BaseBlock {

    @property(cc.Node)
    top: cc.Node = null;
    @property(cc.Node)
    bottom: cc.Node = null;
    @property(cc.Float)
    offsetScaleMin: number = -1.0;
    @property(cc.Float)
    offsetScaleMax: number = 1.0;
    @property([cc.Node])
    bloodNodes: Array<cc.Node> = []
    
    init(): void {
        let offsetScale = MathHelper.GetRandomIntegerInRange(this.offsetScaleMin * 10, this.offsetScaleMax * 10) / 10;
        this.top.scaleY = 1 + offsetScale;
        this.bottom.scaleY = 1 - offsetScale;
    }

    showBlood(): void {
        // this.bloodNodes.forEach(node => {
        //     node.active = true;
        // });
        this.node.opacity = 255;
    }

}