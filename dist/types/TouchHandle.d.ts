import Deceleration from './Deceleration';
import { Options } from './interface.d';
declare class TouchHandle extends Deceleration {
    protected constructor(options: Options);
    protected doTouchStart(touches: TouchList, timeStamp: number): void;
    protected doTouchMove(touches: TouchList, timeStamp: number): void;
    protected doTouchEnd(timeStamp: number): void;
    protected doTouchMoveScroll(move: number, type: string): void;
}
export default TouchHandle;
