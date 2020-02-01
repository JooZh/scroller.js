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
    // 验证触摸事件
    exports.isTouch = (timeStamp, touches) => {
        if (touches && !touches.length) {
            throw new Error('Invalid touch list: ' + touches);
        }
        if (typeof timeStamp !== 'number') {
            throw new Error('Invalid timestamp value: ' + timeStamp);
        }
    };
    // 缓动函数
    exports.easeOut = (pos) => {
        return Math.pow(pos - 1, 3) + 1;
    };
    exports.easeInOut = (pos) => {
        if ((pos /= 0.5) < 1) {
            return 0.5 * Math.pow(pos, 3);
        }
        return 0.5 * (Math.pow(pos - 2, 3) + 2);
    };
    // 渲染函数
    exports.render = (el) => {
        return function (left, top) {
            el.style.transform = 'translate3d(' + (-left) + 'px,' + (-top) + 'px,0)';
        };
    };
});
