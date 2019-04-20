const { ccclass, property } = cc._decorator;

@ccclass
export abstract class BaseBlock extends cc.Component {

    @property(cc.Integer)
    width: number = 100;

    abstract init(): void;

    abstract showBlood(): void;
}