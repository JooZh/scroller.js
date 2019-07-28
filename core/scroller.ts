
import megerOptions from './options'
import {
    getElement,
    isTouches,
    isTouchesTime
} from './untils'

interface options {

}

interface params {

}

export default class Scroller {
    element: HTMLElement
    options: object = {}
    params: object = {}

    constructor(selector:string | HTMLElement, options:object){
        this.element = getElement(selector)
        let scrollOps = megerOptions(options)
        this.options = scrollOps.queryOptions    
        this.params = scrollOps.privateOptions    
        this.addEvent(this.element)
        this.onObserve(window, this.element)         
    };

    // 将滚动数据同步到也没中
    private render(x:number,y:number,z:number): void {
        this.element.style['transform'] = `translate3d(${-x}px,${-y}px,${z})`;
    }

    // 开启滚动内容区域刷新
    private onObserve(W: Window, element: HTMLElement): void {
        let MutationObserver = ((W)=>{
            return W.MutationObserver || W.WebKitMutationObserver || W.MozMutationObserver;
        })()
        if(!!MutationObserver){
            new MutationObserver((mutations) => {
                let length = mutations.length -1
                    mutations.forEach((item,index) => {
                    if(this.options['snap']){
                        this.refresh()
                    }else{
                        if(length === index){
                            let timer = setTimeout(()=>{
                                this.refresh()
                                clearTimeout (timer)
                            },30)
                        }
                    }
                });
            }).observe(element.children[1],{
                "childList" : true,
                "subtree" : true    
            });
        };
    };
    public refresh(){

    }
    public stopScroll(){

    }






    private addEvent(el:HTMLElement): void {
        // 判断是否支持触摸事件
        const hasTouch: boolean = 'ontouchstart' in window
        const name = {
            start: hasTouch ? 'touchstart' : 'mousedown',
            move: hasTouch ? 'touchmove' : 'mousemove',
            end: hasTouch ? 'touchend' : 'mouseup',
            wheel: 'mousewheel',
        };

        el.addEventListener(name.start, e => {
            this.doTouchStart(e['touches'], e.timeStamp)
        }, false)

        el.addEventListener(name.move, e => {
            e.preventDefault()
            this.doTouchMove(e['touches'], e.timeStamp)
        }, false)

        el.addEventListener(name.end, e => {
            this.doTouchEnd(e.timeStamp)
        }, false)

        el.addEventListener(name.wheel, e => {
            this.doMousewheel(e['deltaY'])
        }, false)
    }
    private doTouchStart(touches:TouchList,timeStamp:number) : void{
        isTouches(touches)
        isTouchesTime(timeStamp)
        this.params['isTracking']= true
        this.stopScroll()
        this.params['lastTouchX']= touches[0].pageX
        this.params['lastTouchY']= touches[0].pageY
        this.params['lastTouchT']= timeStamp
    }
    private doTouchMove(touches:Touch,timeStamp:number) : void{

    }
    private doTouchEnd(timeStamp:number) : void{

    }
    private doMousewheel(deltaY: number) : void{
        this.params['scrollY'] = this.params['scrollY'] += deltaY
        if(this.params['scrollY'] > this.params['maxScrollY']){
            this.params['scrollY'] = this.params['maxScrollY']
        }
        if(this.params['scrollY'] < 0){
            this.params['scrollY'] = 0
        }
        // m._publish(m.scrollX, m.scrollY, true);
    }

}