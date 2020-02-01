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
    function megerOptions(options) {
        const queryOptions = {
            listenScroll: false,
            isPullRefresh: false,
            isReachBottom: false,
            scrollingX: false,
            scrollingY: false,
            animating: true,
            animationDuration: 250,
            mousewheel: false,
            paging: false,
            snap: false,
            snapAlign: 'top',
            snapSelect: 0,
            snapListIndex: 0,
            bouncing: true,
            speedRatio: 1,
            scrollingComplete: () => { },
            snapComplete: () => { },
            peneDece: 0.07,
            peneAcce: 0.08 // 这配置了到达边界时施加于加速度的变化量
        };
        const privateOptions = {
            scrollDirection: '',
            // 状态 {Boolean}
            isTracking: false,
            completeDeceleration: false,
            isDragging: false,
            isDecelerating: false,
            isAnimating: false,
            enableScrollX: false,
            enableScrollY: false,
            refreshActive: false,
            reachActive: false,
            snapAlignInit: false,
            interrupted: true,
            //  {Function}
            refreshStartCb: null,
            refreshCancelCb: null,
            refreshActiveCb: null,
            // {Number}
            scrollX: 0,
            scrollY: 0,
            minScrollX: 0,
            minScrollY: 0,
            maxScrollX: 0,
            maxScrollY: 0,
            prevScrollX: 0,
            prevScrollY: 0,
            scheduledX: 0,
            scheduledY: 0,
            lastTouchX: 0,
            lastTouchY: 0,
            lastTouchT: null,
            velocityX: 0,
            velocityY: 0,
            refreshH: 0,
            loadingH: 0,
            contentW: 0,
            contentH: 0,
            containerW: 0,
            containerH: 0,
            snapW: 50,
            snapH: 50,
            minDeceX: 0,
            minDeceY: 0,
            maxDeceX: 0,
            maxDeceY: 0,
            // {Array} List
            touchArr: null // 位置列表，每个状态使用三个索引=左、上、时间戳
        };
        return {
            queryOptions: Object.assign(queryOptions, options),
            privateOptions: privateOptions
        };
    }
    exports.default = megerOptions;
});
