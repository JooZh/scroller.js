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
var TouchHandle_1 = require("./TouchHandle");
var Dimensions = /** @class */ (function (_super) {
    __extends(Dimensions, _super);
    function Dimensions(selector, options) {
        var _this = _super.call(this, options) || this;
        _this.initElement(selector);
        return _this;
    }
    Dimensions.prototype.initElement = function (selector) {
        // 验证
        if (!selector)
            throw new Error('Could not find node to mount scroll');
        // 初始化挂载节点
        if (typeof selector === 'string') {
            var el = document.querySelector(selector);
            if (el) {
                this.content = el;
                this.container = this.content.parentNode;
                this.initEventListener();
            }
            else {
                throw new Error("Could not find element \"" + selector + "\" ");
            }
        }
    };
    Dimensions.prototype.initEventListener = function () {
        var _this = this;
        var el = this.container;
        // 触摸开始事件
        el.addEventListener('touchstart', function (evt) {
            if (evt.target.tagName.match(/input|textarea|select/i))
                return;
            evt.preventDefault();
            _this.doTouchStart(evt.touches, evt.timeStamp);
        }, false);
        // 触摸移动事件
        el.addEventListener('touchmove', function (e) {
            e.preventDefault();
            _this.doTouchMove(e.touches, e.timeStamp);
        }, false);
        // 触摸结束事件
        el.addEventListener('touchend', function (e) {
            e.preventDefault();
            _this.doTouchEnd(e.timeStamp);
        }, false);
    };
    return Dimensions;
}(TouchHandle_1.default));
exports.default = Dimensions;
//# sourceMappingURL=Viewport.js.map