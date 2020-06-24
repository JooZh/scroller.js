"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Attributes = /** @class */ (function () {
    function Attributes(options) {
        this.handles = [];
        this.touchRecord = [];
        this.isTracking = false;
        this.isDragging = false; // 用户移动的距离是否已达到启用拖动模式的程度。 提示:只有在移动了一些像素后，才可以不被点击等打断。
        this.isDecelerating = 0; // 是否正在减速中
        this.isAnimating = false;
        this.interrupted = true;
        this.minScrollX = 0;
        this.minScrollY = 0;
        this.maxScrollX = 0;
        this.maxScrollY = 0;
        this.contentWidth = 0; // 滚动内容宽度
        this.contentHeight = 0; // 滚动内容高度
        this.containerWidth = 0; // 可视容器宽度
        this.containerHeight = 0; // 可视容器高度
        this.startTouchX = 0;
        this.startTouchY = 0;
        this.startTouchT = 0;
        this.moveTouchX = 0;
        this.moveTouchY = 0;
        this.moveTouchT = 0;
        this.endTouchX = 0;
        this.endTouchY = 0;
        this.endTouchT = 0;
        this.scrollX = 0; // 当前在x轴上的滚动位置
        this.scrollY = 0; // 当前在y轴上的滚动位置
        this.prevScrollX = 0; // 上一个横向滚动位置
        this.prevScrollY = 0; // 上一个纵向滚动位置
        this.velocityX = 0;
        this.velocityY = 0;
        this.velocityMin = 1; // 开始减速需要多少速度
        this.minDecelerationX = 0; //最小减速时X滚动位置
        this.minDecelerationY = 0; //最小减速时Y滚动位置
        this.maxDecelerationX = 0; //最大减速时X滚动位置
        this.maxDecelerationY = 0; //最大减速时Y滚动位置
        this.completeDeceleration = false;
        this.penetrationDeceleration = 0.03;
        this.penetrationAcceleration = 0.08;
        this.enableScrollX = false;
        this.enableScrollY = false;
        this.ops = options;
        this.ops.speedRatio = 1;
    }
    Attributes.prototype.on = function (event, handle) {
        if (!this.handles.hasOwnProperty(event)) {
            this.handles[event] = [];
        }
        this.handles[event].push(handle);
    };
    Attributes.prototype.emit = function (event) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        if (this.handles.hasOwnProperty(event)) {
            this.handles[event].forEach(function (item) {
                item.apply(null, args);
            });
        }
        else {
            throw new Error("\"" + event + "\" Event not registered");
        }
    };
    Attributes.prototype.publish = function (x, y) { };
    return Attributes;
}());
exports.default = Attributes;
//# sourceMappingURL=Attributes.js.map