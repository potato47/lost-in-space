import { BaseBlock } from './block/BaseBlock';
import { MainScene } from './MainScene';
import { MathHelper } from '../../utils/MathHelper';

const { ccclass, property } = cc._decorator;

@ccclass
export class RoadManager extends cc.Component {

    @property(cc.Integer)
    width: number = 10000;
    @property(cc.Node)
    bg: cc.Node = null;
    @property([cc.Prefab])
    blockPrefabs: cc.Prefab[] = [];
    @property(cc.Integer)
    minSpace: number = 2000;
    @property(cc.Integer)
    maxSpace: number = 3000;

    private mainScene: MainScene = null;
    private nextBlockX: number = 0;

    init(mainScene: MainScene) {
        this.mainScene = mainScene;
        this.bg.width = this.width;
        this.initBlocks();
        this.mainScene.onRoadInit(-this.width / 2, this.width / 2);
    }

    getHalfDistance() {
        return this.width / 2;
    }

    initBlocks() {
        this.nextBlockX = -this.width / 2 + 1000;
        let right = this.width / 2 - 1000
        while (this.nextBlockX < right) {
            this.addBlock();
        }
    }

    addBlock() {
        let i = Math.random() * this.blockPrefabs.length | 0;
        let blockNode = cc.instantiate(this.blockPrefabs[i]);
        blockNode.position = cc.v2(this.nextBlockX, 0);
        this.bg.addChild(blockNode);
        blockNode.getComponent(BaseBlock).init();
        this.nextBlockX += blockNode.getComponent(BaseBlock).width + this.getRandomSpace();
    }

    getRandomSpace() {
        return MathHelper.GetRandomIntegerInRange(this.minSpace, this.maxSpace);
    }
}