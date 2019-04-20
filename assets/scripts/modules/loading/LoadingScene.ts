const { ccclass, property } = cc._decorator;

@ccclass
export class LoadingScene extends cc.Component {

    start() {
        cc.director.loadScene('main');
    }
}
