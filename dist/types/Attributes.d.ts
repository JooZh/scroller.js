import { Options, touchRecord } from './interface.d';
declare abstract class Attributes {
    protected ops: Options;
    protected handles: [];
    protected touchRecord: touchRecord[];
    protected content: Node;
    protected container: Node;
    protected isTracking: boolean;
    protected isDragging: boolean;
    protected isDecelerating: number;
    protected isAnimating: boolean;
    protected interrupted: boolean;
    protected minScrollX: number;
    protected minScrollY: number;
    protected maxScrollX: number;
    protected maxScrollY: number;
    protected contentWidth: number;
    protected contentHeight: number;
    protected containerWidth: number;
    protected containerHeight: number;
    protected startTouchX: number;
    protected startTouchY: number;
    protected startTouchT: number;
    protected moveTouchX: number;
    protected moveTouchY: number;
    protected moveTouchT: number;
    protected endTouchX: number;
    protected endTouchY: number;
    protected endTouchT: number;
    protected scrollX: number;
    protected scrollY: number;
    protected prevScrollX: number;
    protected prevScrollY: number;
    protected velocityX: number;
    protected velocityY: number;
    protected velocityMin: number;
    protected minDecelerationX: number;
    protected minDecelerationY: number;
    protected maxDecelerationX: number;
    protected maxDecelerationY: number;
    protected completeDeceleration: boolean;
    protected penetrationDeceleration: number;
    protected penetrationAcceleration: number;
    protected refreshStartCb: Function;
    protected refreshCancelCb: Function;
    protected refreshActiveCb: Function;
    enableScrollX: boolean;
    enableScrollY: boolean;
    protected constructor(options: Options);
    on(event: any, handle: Function): void;
    emit(event: string, ...args: any): void;
    protected publish(x: number, y: number): void;
}
export default Attributes;
