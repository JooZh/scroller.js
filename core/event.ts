export default class event {
    
    element: HTMLElement;

    addEvent(): void {
        // 判断是否支持触摸事件
        const hasTouch: boolean = 'ontouchstart' in window
        const name = {
            start: hasTouch ? 'touchstart' : 'mousedown',
            move: hasTouch ? 'touchmove' : 'mousemove',
            end: hasTouch ? 'touchend' : 'mouseup',
            wheel: 'mousewheel',
        };

        this.element.addEventListener(name.start, e => {
            this.doTouchStart(e['touches'], e.timeStamp)
        }, false)

        this.element.addEventListener(name.move, e => {
            e.preventDefault()
            this.doTouchMove(e['touches'], e.timeStamp)
        }, false)

        this.element.addEventListener(name.end, e => {
            this.doTouchEnd(e.timeStamp)
        }, false)

        this.element.addEventListener(name.wheel, e => {
            this.doMousewheel(e['deltaY'])
        }, false)
    }

    doTouchStart(touches:Touch,timeStamp:number){

    }
    doTouchMove(touches:Touch,timeStamp:number){

    }
    doTouchEnd(timeStamp:number){

    }
    doMousewheel(deltaY: number){
        m.scrollY = m.scrollY += e.deltaY
        if(m.scrollY>m.maxScrollY){
            m.scrollY = m.maxScrollY
        }
        if(m.scrollY < 0){
            m.scrollY = 0
        }
        m._publish(m.scrollX, m.scrollY, true);
    }

}