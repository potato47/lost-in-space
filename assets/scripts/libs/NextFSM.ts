export class NextFSM {
    
    private _state: number;
    private _lastState: number;

    public getState(): number {
        return this._state;
    }

    public getLastState(): number {
        return this._lastState;
    }
    
    public setState(state: number): boolean {
        if (this.canTo(state)) {
            this._lastState = this._state;
            this._state = state;
            this.stateMap[this._lastState].exit && this.stateMap[this._lastState].exit.apply(this.target);
            this.stateMap[this._state].enter && this.stateMap[this._state].enter.apply(this.target);
            return true;
        } else {
            console.error('can not set state');
            return false;
        }
    }

    public canTo(state: number) {
        return this.stateMap[this._state].to.indexOf(state) > -1;
    }
    
    constructor(private stateMap: IStateMap, private initState: number, private target: any) {
        this._state = this.initState;
    }
}

export interface IStateMap {
    [state: number]: {
        to: Array<number>,
        enter?: Function,
        exit?: Function,
    }
}