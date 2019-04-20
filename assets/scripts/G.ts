class Game extends cc.EventTarget {

    static Instance = new Game();

    private constructor() {
        super();
        this.initManagers();
    }

    private initManagers() {

    }

}

export const G = Game.Instance;