(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class event {
        addEvent() {
            // 判断是否支持触摸事件
            const hasTouch = 'ontouchstart' in window;
            const name = {
                start: hasTouch ? 'touchstart' : 'mousedown',
                move: hasTouch ? 'touchmove' : 'mousemove',
                end: hasTouch ? 'touchend' : 'mouseup',
                wheel: 'mousewheel',
            };
            this.element.addEventListener(name.start, e => {
                this.doTouchStart(e['touches'], e.timeStamp);
            }, false);
            this.element.addEventListener(name.move, e => {
                e.preventDefault();
                this.doTouchMove(e['touches'], e.timeStamp);
            }, false);
            this.element.addEventListener(name.end, e => {
                this.doTouchEnd(e.timeStamp);
            }, false);
            this.element.addEventListener(name.wheel, e => {
                this.doMousewheel(e['deltaY']);
            }, false);
        }
        doTouchStart(touches, timeStamp) {
        }
        doTouchMove(touches, timeStamp) {
        }
        doTouchEnd(timeStamp) {
        }
        doMousewheel(deltaY) {
            m.scrollY = m.scrollY += e.deltaY;
            if (m.scrollY > m.maxScrollY) {
                m.scrollY = m.maxScrollY;
            }
            if (m.scrollY < 0) {
                m.scrollY = 0;
            }
            m._publish(m.scrollX, m.scrollY, true);
        }
    }
    exports.default = event;
});
