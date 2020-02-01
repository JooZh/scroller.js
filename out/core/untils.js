/*================================================
 * 主要定义了一些工具方法
 *==============================================*/
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
    // 判断是否有触摸事件
    function isTouches(touches) {
        if (touches.length == null) {
            throw new Error("Invalid touch list: " + touches);
        }
    }
    exports.isTouches = isTouches;
    // 判断是否有触摸时间戳
    function isTouchesTime(timeStamp) {
        if (timeStamp instanceof Date) {
            timeStamp = timeStamp.valueOf();
        }
        if (typeof timeStamp !== "number") {
            throw new Error("Invalid timestamp value: " + timeStamp);
        }
    }
    exports.isTouchesTime = isTouchesTime;
    // 缓动函数
    function easeOutCubic(pos) {
        return (Math.pow((pos - 1), 3) + 1);
    }
    exports.easeOutCubic = easeOutCubic;
    // 缓动函数
    function easeInOutCubic(pos) {
        if ((pos /= 0.5) < 1) {
            return 0.5 * Math.pow(pos, 3);
        }
        return 0.5 * (Math.pow((pos - 2), 3) + 2);
    }
    exports.easeInOutCubic = easeInOutCubic;
    // 获取节点
    function getElement(selector) {
        let element;
        if (typeof selector === 'string') {
            element = document.querySelector(selector);
        }
        else if (typeof selector === 'object' && selector.nodeType === 1) {
            element = selector;
        }
        return element;
    }
    exports.getElement = getElement;
    // 是否可以减速
    function canDeceleration(options, params) {
        let m = this;
        let flag = false;
        // 然后计算出100毫秒前滚动的位置
        let endPos = options.touchArr.length - 1;
        let startPos = endPos;
        // 将指针移动到100ms前测量的位置
        for (let i = endPos; i > 0 && m._touchArr[i] > (m._lastTouchT - 100); i -= 3) {
            startPos = i;
        }
        // 如果开始和停止位置在100ms时间内相同，我们无法计算任何有用的减速。
        if (startPos !== endPos) {
            // 计算这两点之间的相对运动
            let timeOffset = m._touchArr[endPos] - m._touchArr[startPos];
            let movedX = m.scrollX - m._touchArr[startPos - 2];
            let movedY = m.scrollY - m._touchArr[startPos - 1];
            // 基于50ms计算每个渲染步骤的移动
            m._velocityX = movedX / timeOffset * (1000 / 60);
            m._velocityY = movedY / timeOffset * (1000 / 60);
            // 开始减速需要多少速度
            let minVelocityToStartDeceleration = m.ops.paging || m.ops.snap ? 4 : 1;
            // 验证我们有足够的速度开始减速
            let isVelocityX = Math.abs(m._velocityX) > minVelocityToStartDeceleration;
            let isVelocityY = Math.abs(m._velocityY) > minVelocityToStartDeceleration;
            if (isVelocityX || isVelocityY) {
                flag = true;
            }
        }
        return flag;
    }
    exports.canDeceleration = canDeceleration;
});
