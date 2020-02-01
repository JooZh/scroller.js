import { Options,touchRecord, handler } from './interface.d'

abstract class Attributes {

    protected ops: Options
    protected handles: [] = []
    protected touchRecord: touchRecord[] = []

  	protected content!: Node
    protected container!: Node

    protected isTracking: boolean = false
    protected isDragging: boolean = false               // 用户移动的距离是否已达到启用拖动模式的程度。 提示:只有在移动了一些像素后，才可以不被点击等打断。
    protected isDecelerating: number = 0                // 是否正在减速中
    protected isAnimating: boolean = false
    protected interrupted: boolean = true

    protected minScrollX: number = 0
    protected minScrollY: number = 0
    protected maxScrollX: number = 0
    protected maxScrollY: number = 0

    protected contentWidth: number = 0 // 滚动内容宽度
    protected contentHeight: number = 0 // 滚动内容高度
    protected containerWidth: number = 0 // 可视容器宽度
    protected containerHeight: number = 0 // 可视容器高度

    protected startTouchX: number = 0
    protected startTouchY: number = 0
    protected startTouchT: number = 0

    protected moveTouchX: number = 0
    protected moveTouchY: number = 0
    protected moveTouchT: number = 0

    protected endTouchX: number = 0
    protected endTouchY: number = 0
    protected endTouchT: number = 0

    protected scrollX: number = 0       // 当前在x轴上的滚动位置
    protected scrollY: number = 0       // 当前在y轴上的滚动位置
    protected prevScrollX: number = 0    // 上一个横向滚动位置
    protected prevScrollY: number = 0    // 上一个纵向滚动位置

    protected velocityX: number = 0
    protected velocityY: number = 0
    protected velocityMin: number = 1   // 开始减速需要多少速度

    protected minDecelerationX: number = 0; //最小减速时X滚动位置
    protected minDecelerationY: number = 0; //最小减速时Y滚动位置
    protected maxDecelerationX: number = 0; //最大减速时X滚动位置
    protected maxDecelerationY: number = 0; //最大减速时Y滚动位置

    protected completeDeceleration: boolean = false;
    protected penetrationDeceleration: number = 0.03;
    protected penetrationAcceleration: number = 0.08;

    protected refreshStartCb!: Function // 执行回调以启动实际刷新
    protected refreshCancelCb!: Function // 在停用时执行的回调。这是为了通知用户刷新被取消
    protected refreshActiveCb!: Function // 回调函数，以在激活时执行。这是为了在用户释放时通知他即将发生刷新

    public enableScrollX: boolean = false;
	public enableScrollY: boolean = false;

    protected constructor(options: Options) {
        this.ops = options
        this.ops.speedRatio = 1;
    }

    public on(event:any, handle:Function) {
        if (!this.handles.hasOwnProperty(event)) {
            this.handles[event] = [];
        }
        this.handles[event].push(handle);
    }

    public emit(event: string, ...args: any) {
        if (this.handles.hasOwnProperty(event)) {
            this.handles[event].forEach((item: any) => {
                item.apply(null, args);
            });
        } else {
            throw new Error(`"${event}" Event not registered`);
        }
    }

    protected publish(x:number,y:number): void {}

}

export default Attributes;
