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
var Viewport_1 = require("./Viewport");
var Scroller = /** @class */ (function (_super) {
    __extends(Scroller, _super);
    function Scroller(selector, options) {
        return _super.call(this, selector, options) || this;
    }
    return Scroller;
}(Viewport_1.default));
exports.default = Scroller;
//# sourceMappingURL=Scroller.js.map