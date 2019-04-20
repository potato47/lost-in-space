export class MathHelper {

    static GetRandomIntegerInRange(min: number, max: number, includeMin: boolean = true, includeMax: boolean = true):number {
        const left = includeMin ? min : min + 1;
        const right = includeMax ? max + 1 : max;
        return left + Math.floor(Math.random() * (right - left));
    }

}