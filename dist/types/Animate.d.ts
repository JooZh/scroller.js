declare class Animate {
    running: object;
    counter: number;
    time: Function;
    animate(callback: any): void;
    stop(id: number): boolean;
    isRunning(id: number): boolean;
    start(stepCb: Function, verifyCb: Function, completedCb: Function, duration?: number, easingMethod?: Function): number;
}
declare const _default: Animate;
export default _default;
