import { BaseBlock } from './block/BaseBlock';
import { MainScene } from './MainScene';
import { MathHelper } from '../../utils/MathHelper';
import { Wave } from './Wave';

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
    @property(cc.Prefab)
    wavePrefab: cc.Prefab = null;

    wavePool: cc.NodePool;
    private mainScene: MainScene = null;
    private nextBlockX: number = 0;

    init(mainScene: MainScene) {
        this.mainScene = mainScene;
        this.bg.width = this.width;
        this.initBlocks();
        this.initWavePool();
        this.mainScene.onRoadInit(-this.width / 2, this.width / 2);
    }

    getHalfDistance() {
        return this.width / 2;
    }

    initBlocks() {
        this.nextBlockX = 1000;
        let right = this.width / 2 - 1000
        while (this.nextBlockX < right) {
            this.addBlock();
        }
    }

    initWavePool() {
        this.wavePool = new cc.NodePool();
        for (let i = 0; i < 8; i++) {
            this.wavePool.put(cc.instantiate(this.wavePrefab));
        }
    }

    createWaveNode(dir: number) {
        let node: cc.Node = null;
        if (this.wavePool.size() > 0) {
            node = this.wavePool.get();
        } else {
            node = cc.instantiate(this.wavePrefab);
        }
        node.position = cc.v2(0, 0);
        node.scaleX = dir;
        return node;
    }

    onWaveNodeRecycle(node: cc.Node) {
        this.wavePool.put(node);
    }

    shot(worldPos: cc.Vec2, dir: number) {
        for (let i = 0; i < 5; i++) {
            let waveNode = this.createWaveNode(dir);
            this.node.addChild(waveNode);
            waveNode.position = this.node.convertToNodeSpaceAR(worldPos);
            waveNode.getComponent(Wave).shot(dir, this.onWaveNodeRecycle.bind(this));
        }
    }

    addBlock() {
        let i = Math.random() * this.blockPrefabs.length | 0;
        let blockNode1 = cc.instantiate(this.blockPrefabs[i]);
        blockNode1.position = cc.v2(this.nextBlockX, 0);
        this.bg.addChild(blockNode1);
        blockNode1.getComponent(BaseBlock).init();
        // 对称添加障碍物
        let blockNode2 = cc.instantiate(this.blockPrefabs[i]);
        blockNode2.position = cc.v2(-this.nextBlockX, 0);
        this.bg.addChild(blockNode2);
        blockNode2.getComponent(BaseBlock).init();
        this.nextBlockX += blockNode1.getComponent(BaseBlock).width + this.getRandomSpace();
    }

    getRandomSpace() {
        return MathHelper.GetRandomIntegerInRange(this.minSpace, this.maxSpace);
    }
}