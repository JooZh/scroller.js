"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Deceleration_1 = require("./Deceleration");
var utils_1 = require("./utils");
var TouchHandle = /** @class */ (function (_super) {
    __extends(TouchHandle, _super);
    function TouchHandle(options) {
        return _super.call(this, options) || this;
    }
    TouchHandle.prototype.doTouchStart = function (touches, timeStamp) {
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
    };
    TouchHandle.prototype.doTouchMove = function (touches, timeStamp) {
        utils_1.isTouch(timeStamp, touches);
        if (!this.isTracking)
            return;
        var currentTouchX = touches[0].pageX;
        var currentTouchY = touches[0].pageY;
        var moveX = currentTouchX - this.moveTouchX;
        var moveY = currentTouchY - this.moveTouchY;
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
    };
    TouchHandle.prototype.doTouchEnd = function (timeStamp) {
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
    };
    TouchHandle.prototype.doTouchMoveScroll = function (move, type) {
        var scroll = 'scroll' + type;
        var maxScroll = 'maxScroll' + type;
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
    };
    return TouchHandle;
}(Deceleration_1.default));
exports.default = TouchHandle;
//# sourceMappingURL=TouchHandle.js.map