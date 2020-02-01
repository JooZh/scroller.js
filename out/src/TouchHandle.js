(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./Deceleration", "./utils"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const Deceleration_1 = require("./Deceleration");
    const utils_1 = require("./utils");
    class TouchHandle extends Deceleration_1.default {
        constructor(options) {
            super(options);
        }
        doTouchStart(touches, timeStamp) {
            utils_1.isTouch(timeStamp, touches);
            this.isTracking = true;
            // 执行停止动画
            this.startTouchX = touches[0].pageX;
            this.startTouchY = touches[0].pageY;
            this.startTouchT = timeStamp;
            this.moveTouchX = touches[0].pageX;
            this.moveTouchY = touches[0].pageY;
            this.moveTouchT = timeStamp;
            this.touchRecord.push({
                x: this.scrollX,
                y: this.scrollY,
                t: timeStamp
            });
        }
        doTouchMove(touches, timeStamp) {
            utils_1.isTouch(timeStamp, touches);
            if (!this.isTracking)
                return;
            let currentTouchX = touches[0].pageX;
            let currentTouchY = touches[0].pageY;
            let moveX = currentTouchX - this.moveTouchX;
            let moveY = currentTouchY - this.moveTouchY;
            if (this.enableScrollX)
                this.doTouchMoveScroll(moveX, 'X');
            if (this.enableScrollX)
                this.doTouchMoveScroll(moveY, 'Y');
            if (this.touchRecord.length > 100)
                this.touchRecord.splice(0, 20);
            this.publish(this.scrollX, this.scrollY);
            // 跟踪滚动的运动
            this.touchRecord.push({
                x: this.scrollX,
                y: this.scrollY,
                t: timeStamp
            });
            this.moveTouchX = currentTouchX;
            this.moveTouchY = currentTouchY;
            this.moveTouchT = timeStamp;
        }
        doTouchEnd(timeStamp) {
            utils_1.isTouch(timeStamp);
            if (!this.isTracking)
                return;
            this.endTouchX = this.moveTouchX;
            this.endTouchY = this.moveTouchY;
            this.endTouchT = timeStamp;
            this.touchRecord.push({
                x: this.scrollX,
                y: this.scrollY,
                t: timeStamp
            });
            this.isTracking = false;
            this.emit('touchEnd');
        }
        doTouchMoveScroll(move, type) {
            let scroll = 'scroll' + type;
            let maxScroll = 'maxScroll' + type;
            this[scroll] -= move * this.ops.speedRatio;
            if (this[scroll] > this[maxScroll] || this[scroll] < 0) {
                if (this.ops.bouncing) {
                    this[scroll] += (move / 1.5) * this.ops.speedRatio;
                    if (type === 'Y' && !!this.ops.onPullRefresh) {
                        this.emit('pullRefresh');
                    }
                }
                else if (this[scroll] < 0) {
                    this[scroll] = 0;
                }
                else {
                    this[scroll] = this[maxScroll];
                }
            }
        }
    }
    exports.default = TouchHandle;
});
