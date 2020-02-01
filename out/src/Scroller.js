(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./Viewport"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const Viewport_1 = require("./Viewport");
    class Scroller extends Viewport_1.default {
        constructor(selector, options) {
            super(selector, options);
        }
    }
    exports.default = Scroller;
});
