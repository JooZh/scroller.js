declare interface Options {
    snap?: boolean,
    paging?: boolean,                // 启用分页模式(在全容器内容窗格之间切换)
    scrollingX?: boolean,            // 启用x轴滚动
    scrollingY?: boolean,            // 启用y轴滚动
    animating?: boolean,             // 启用动画减速，弹回，缩放和滚动
    animationDuration?: number,      // 由scrollTo/zoomTo触发的动画持续时间
    mousewheel?: boolean,             // 是否启用鼠标滚轮事件
    snapAlign?: string,               // snapAlign使用的方式 [top, middle] 居中对齐和顶部对齐
    snapSelect?: number,              // snap默认选中的值
    snapListIndex?: number,           // snap多列的时候的当前列
    bouncing?:boolean,                 // 启用弹跳(内容可以慢慢移到外面，释放后再弹回来)
    speedRatio?: number,             // 增加或减少滚动速度
    onScroll?: Function,           // 是否启用滚动监听实时获取滚动位置
    onPullRefresh?: Function,          // 是否监听下拉刷新
    onReachBottom?: Function,          // 是否监听触底事件
    scrollingComplete?: Function,    // 在触摸端或减速端后端触发的回调，前提是另一个滚动动作尚未开始。用于知道何时淡出滚动条
    snapComplete?: Function,         // snap 滑动完成后的执行事件
    // peneDece: number,               // 这配置了到达边界时应用于减速的更改量
    // peneAcce: number                // 这配置了到达边界时施加于加速度的变化量
}

declare interface touchRecord {
    x: number,
    y: number,
    t: number
}

export {
    Options,
    touchRecord
}
