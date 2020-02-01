(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./options", "./untils"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const options_1 = require("./options");
    const untils_1 = require("./untils");
    class Scroller {
        constructor(selector, options) {
            this.options = {};
            this.params = {};
            this.element = untils_1.getElement(selector);
            let scrollOps = options_1.default(options);
            this.options = scrollOps.queryOptions;
            this.params = scrollOps.privateOptions;
            this.addEvent(this.element);
            this.onObserve(window, this.element);
        }
        ;
        // 将滚动数据同步到也没中
        render(x, y, z) {
            this.element.style['transform'] = `translate3d(${-x}px,${-y}px,${z})`;
        }
        // 开启滚动内容区域刷新
        onObserve(W, element) {
            let MutationObserver = ((W) => {
                return W.MutationObserver || W.WebKitMutationObserver || W.MozMutationObserver;
            })();
            if (!!MutationObserver) {
                new MutationObserver((mutations) => {
                    let length = mutations.length - 1;
                    mutations.forEach((item, index) => {
                        if (this.options['snap']) {
                            this.refresh();
                        }
                        else {
                            if (length === index) {
                                let timer = setTimeout(() => {
                                    this.refresh();
                                    clearTimeout(timer);
                                }, 30);
                            }
                        }
                    });
                }).observe(element.children[1], {
                    "childList": true,
                    "subtree": true
                });
            }
            ;
        }
        ;
        refresh() {
        }
        stopScroll() {
        }
        addEvent(el) {
            // 判断是否支持触摸事件
            const hasTouch = 'ontouchstart' in window;
            const name = {
                start: hasTouch ? 'touchstart' : 'mousedown',
                move: hasTouch ? 'touchmove' : 'mousemove',
                end: hasTouch ? 'touchend' : 'mouseup',
                wheel: 'mousewheel',
            };
            el.addEventListener(name.start, e => {
                this.doTouchStart(e['touches'], e.timeStamp);
            }, false);
            el.addEventListener(name.move, e => {
                e.preventDefault();
                this.doTouchMove(e['touches'], e.timeStamp);
            }, false);
            el.addEventListener(name.end, e => {
                this.doTouchEnd(e.timeStamp);
            }, false);
            el.addEventListener(name.wheel, e => {
                this.doMousewheel(e['deltaY']);
            }, false);
        }
        doTouchStart(touches, timeStamp) {
            untils_1.isTouches(touches);
            untils_1.isTouchesTime(timeStamp);
            this.params['isTracking'] = true;
            this.stopScroll();
            this.params['lastTouchX'] = touches[0].pageX;
            this.params['lastTouchY'] = touches[0].pageY;
            this.params['lastTouchT'] = timeStamp;
        }
        doTouchMove(touches, timeStamp) {
        }
        doTouchEnd(timeStamp) {
        }
        doMousewheel(deltaY) {
            this.params['scrollY'] = this.params['scrollY'] += deltaY;
            if (this.params['scrollY'] > this.params['maxScrollY']) {
                this.params['scrollY'] = this.params['maxScrollY'];
            }
            if (this.params['scrollY'] < 0) {
                this.params['scrollY'] = 0;
            }
            // m._publish(m.scrollX, m.scrollY, true);
        }
    }
    exports.default = Scroller;
});
