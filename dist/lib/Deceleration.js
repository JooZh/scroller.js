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
var Attributes_1 = require("./Attributes");
var Animate_1 = require("./Animate");
var Deceleration = /** @class */ (function (_super) {
    __extends(Deceleration, _super);
    function Deceleration(options) {
        return _super.call(this, options) || this;
    }
    Deceleration.prototype.hasDeceleration = function () {
        var status = false;
        var touchRecord = this.touchRecord;
        var recordLength = touchRecord.length;
        var endIndex = recordLength - 1;
        var startIndex = endIndex;
        var movedX = 0, movedY = 0, timeOffset = 0;
        if (recordLength === 3) {
            timeOffset = 12;
            movedX = this.scrollX - this.prevScrollX;
            movedY = this.scrollY - this.prevScrollY;
        }
        if (recordLength > 3) {
            // 如果是极端短距离滑动，直接设置开始为记录值的第一个
            if (recordLength > 3 && recordLength <= 10) {
                startIndex = 0;
                // 正常滑动 将指针移动到100ms前测量的位置
            }
            else if (recordLength > 10) {
                for (var i = recordLength; i > 0 && touchRecord[i].t > this.moveTouchT - 100; i -= 1) {
                    startIndex = i;
                }
            }
            timeOffset = touchRecord[endIndex].t - touchRecord[startIndex].t;
            movedX = this.scrollX - touchRecord[startIndex].x;
            movedY = this.scrollY - touchRecord[startIndex].y;
        }
        this.velocityX = (movedX / timeOffset) * (1000 / 60);
        this.velocityY = (movedY / timeOffset) * (1000 / 60);
        status = true;
        return status;
    };
    Deceleration.prototype.startDeceleration = function () {
        var _this = this;
        // 是否分屏
        if (this.ops.paging) {
            var scrollX_1 = Math.max(Math.min(this.scrollX, this.maxScrollX), 0);
            var scrollY_1 = Math.max(Math.min(this.scrollY, this.maxScrollY), 0);
            // 我们不是将减速限制在允许范围的最小/最大值，而是将减速限制在可见客户机区域的大小。每个页面都应该有准确的客户区域大小。
            this.minDecelerationX = Math.floor(scrollX_1 / this.containerWidth) * this.containerWidth;
            this.minDecelerationY = Math.floor(scrollY_1 / this.containerHeight) * this.containerHeight;
            this.maxDecelerationX = Math.ceil(scrollX_1 / this.containerWidth) * this.containerWidth;
            this.maxDecelerationY = Math.ceil(scrollY_1 / this.containerHeight) * this.containerHeight;
        }
        else {
            this.minDecelerationX = 0;
            this.minDecelerationY = 0;
            this.maxDecelerationX = this.maxScrollX;
            this.maxDecelerationY = this.maxScrollY;
        }
        // 包装类方法
        var step = function (percent, now, render) {
            _this.stepThroughDeceleration(render);
        };
        // 保持减速运行需要多少速度
        var minKeepVelocity = this.ops.snap ? 2 : 0.001;
        // 检测是否仍然值得继续动画步骤 如果我们已经慢到无法再被用户感知，我们就会在这里停止整个过程。
        var verify = function () {
            var absX = Math.abs(_this.velocityX) >= minKeepVelocity;
            var absY = Math.abs(_this.velocityY) >= minKeepVelocity;
            var shouldContinue = absX || absY;
            if (!shouldContinue) {
                _this.completeDeceleration = true;
            }
            return shouldContinue;
        };
        //
        var completed = function (renderedFramesPerSecond, animationId, wasFinished) {
            _this.isDecelerating = 0;
            if (_this.completeDeceleration) {
                _this.ops.scrollingComplete();
            }
            // 动画网格时，捕捉是活跃的，否则只是固定边界外的位置
            _this.scrollTo(_this.scrollX, _this.scrollY, _this.ops.snap);
        };
        // 启动动画并打开标志
        this.isDecelerating = Animate_1.default.start(step, verify, completed);
    };
    Deceleration.prototype.stepThroughDeceleration = function (render) {
        var frictionFactor = 0.97;
        // 计算下一个滚动位置 增加减速到滚动位置
        var scrollX = this.scrollX + this.velocityX;
        var scrollY = this.scrollY + this.velocityY;
        // 硬性限制滚动位置为非弹跳模式
        if (!this.ops.bouncing) {
            var minScrollXFixed = Math.min(this.maxDecelerationX, scrollX);
            var scrollXFixed = Math.max(minScrollXFixed, this.minDecelerationX);
            if (scrollXFixed !== scrollX) {
                scrollX = scrollXFixed;
                this.velocityX = 0;
            }
            var minScrollYFixed = Math.min(this.minDecelerationY, scrollY);
            var scrollYFixed = Math.max(minScrollYFixed, this.minDecelerationY);
            if (scrollYFixed !== scrollY) {
                scrollY = scrollYFixed;
                this.velocityY = 0;
            }
        }
        // 记录上一个滚动位置
        this.prevScrollX = this.scrollX;
        this.prevScrollY = this.scrollY;
        // 更新滚动位置
        if (render) {
            this.publish(scrollX, scrollY);
        }
        else {
            this.scrollX = scrollX;
            this.scrollY = scrollY;
        }
        // 在每次迭代中减慢速度 模拟自然行为
        if (!this.ops.paging) {
            this.velocityX *= frictionFactor;
            this.velocityY *= frictionFactor;
        }
        // 跳跃的支持
        if (this.ops.bouncing) {
            var scrollOutsideX = 0;
            var scrollOutsideY = 0;
            // 这配置了到达边界时应用于减速/加速的更改量
            var peneDece = this.penetrationDeceleration;
            var peneAcce = this.penetrationAcceleration;
            // 检查限制
            if (scrollX < this.minDecelerationX) {
                scrollOutsideX = this.minDecelerationX - scrollX;
            }
            else if (scrollX > this.maxDecelerationX) {
                scrollOutsideX = this.maxDecelerationX - scrollX;
            }
            if (scrollY < this.minDecelerationY) {
                scrollOutsideY = this.minDecelerationY - scrollY;
            }
            else if (scrollY > this.maxDecelerationY) {
                scrollOutsideY = this.maxDecelerationY - scrollY;
            }
            // 慢下来，直到足够慢，然后翻转回弹起位置
            if (scrollOutsideX !== 0) {
                if (scrollOutsideX * this.velocityX <= 0) {
                    this.velocityX += scrollOutsideX * peneDece;
                }
                else {
                    this.velocityX = scrollOutsideX * peneAcce;
                }
            }
            if (scrollOutsideY !== 0) {
                if (scrollOutsideY * this.velocityY <= 0) {
                    this.velocityY += scrollOutsideY * peneDece;
                }
                else {
                    this.velocityY = scrollOutsideY * peneAcce;
                }
            }
        }
    };
    Deceleration.prototype.scrollTo = function (x, y, snap) {
    };
    return Deceleration;
}(Attributes_1.default));
exports.default = Deceleration;
//# sourceMappingURL=Deceleration.js.map