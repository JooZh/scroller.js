import TouchHandle from './TouchHandle'
import {Options} from './interface.d'

class Dimensions extends TouchHandle {

    protected constructor(selector:string,options: Options){
        super(options);
        this.initElement(selector)
    }

    protected initElement(selector:string): void {
        // 验证
        if (!selector) throw new Error('Could not find node to mount scroll');
        // 初始化挂载节点
        if (typeof selector === 'string') {
            let el = document.querySelector(selector);
            if (el) {
                this.content = el;
                this.container = this.content.parentNode;
                this.initEventListener()
            } else {
                throw new Error(`Could not find element "${selector}" `);
            }
        }
    }

    protected initEventListener() {
        let el = this.container;
        // 触摸开始事件
        el.addEventListener('touchstart', (evt) => {
            if (evt.target.tagName.match(/input|textarea|select/i)) return;
                evt.preventDefault();
                this.doTouchStart(evt.touches, evt.timeStamp);
            },
            false
        );
        // 触摸移动事件
        el.addEventListener('touchmove', (e: TouchEvent) => {
                e.preventDefault();
                this.doTouchMove(e.touches, e.timeStamp);
            },
            false
        );
        // 触摸结束事件
        el.addEventListener('touchend', (e: TouchEvent) => {
                e.preventDefault();
                this.doTouchEnd(e.timeStamp);
            },
            false
        );
    }
}

export default Dimensions
