(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./TouchHandle"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const TouchHandle_1 = require("./TouchHandle");
    class Dimensions extends TouchHandle_1.default {
        constructor(selector, options) {
            super(options);
            this.initElement(selector);
        }
        initElement(selector) {
            // 验证
            if (!selector)
                throw new Error('Could not find node to mount scroll');
            // 初始化挂载节点
            if (typeof selector === 'string') {
                let el = document.querySelector(selector);
                if (el) {
                    this.content = el;
                    this.container = this.content.parentNode;
                    this.initEventListener();
                }
                else {
                    throw new Error(`Could not find element "${selector}" `);
                }
            }
        }
        initEventListener() {
            let el = this.container;
            // 触摸开始事件
            el.addEventListener('touchstart', (evt) => {
                if (evt.target.tagName.match(/input|textarea|select/i))
                    return;
                evt.preventDefault();
                this.doTouchStart(evt.touches, evt.timeStamp);
            }, false);
            // 触摸移动事件
            el.addEventListener('touchmove', (e) => {
                e.preventDefault();
                this.doTouchMove(e.touches, e.timeStamp);
            }, false);
            // 触摸结束事件
            el.addEventListener('touchend', (e) => {
                e.preventDefault();
                this.doTouchEnd(e.timeStamp);
            }, false);
        }
    }
    exports.default = Dimensions;
});
