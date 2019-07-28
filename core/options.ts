declare interface options {
    istenScroll: boolean,           // 是否启用滚动监听实时获取滚动位置
    isPullRefresh: boolean,          // 是否监听下拉刷新
    isReachBottom: boolean,          // 是否监听触底事件
    scrollingX: boolean,            // 启用x轴滚动
    scrollingY: boolean,            // 启用y轴滚动
    animating: boolean,             // 启用动画减速，弹回，缩放和滚动
    animationDuration: number,      // 由scrollTo/zoomTo触发的动画持续时间
    mousewheel: boolean,             // 是否启用鼠标滚轮事件
    paging: boolean,                // 启用分页模式(在全容器内容窗格之间切换)
    snap: boolean,                  // 启用对已配置像素网格的内容进行快照
    snapAlign: string,               // snapAlign使用的方式 [top, middle] 居中对齐和顶部对齐
    snapSelect: number,              // snap默认选中的值
    snapListIndex: number,           // snap多列的时候的当前列
    bouncing: true,                 // 启用弹跳(内容可以慢慢移到外面，释放后再弹回来)
    speedRatio: number,             // 增加或减少滚动速度
    scrollingComplete: Function,    // 在触摸端或减速端后端触发的回调，前提是另一个滚动动作尚未开始。用于知道何时淡出滚动条
    snapComplete: Function,         // snap 滑动完成后的执行事件
    peneDece: number,               // 这配置了到达边界时应用于减速的更改量
    peneAcce: number                // 这配置了到达边界时施加于加速度的变化量
}

export default function megerOptions (options:options){
    const queryOptions ={
        listenScroll: false,      // 是否启用滚动监听实时获取滚动位置
        isPullRefresh:false,      // 是否监听下拉刷新
        isReachBottom:false,      // 是否监听触底事件
        scrollingX: false,        // 启用x轴滚动
        scrollingY: false,        // 启用y轴滚动
        animating: true,          // 启用动画减速，弹回，缩放和滚动
        animationDuration: 250,   // 由scrollTo/zoomTo触发的动画持续时间
        mousewheel:false,         // 是否启用鼠标滚轮事件
        paging: false,            // 启用分页模式(在全容器内容窗格之间切换)
        snap: false,              // 启用对已配置像素网格的内容进行快照
        snapAlign:'top',          // snapAlign使用的方式 [top, middle] 居中对齐和顶部对齐
        snapSelect:0,             // snap默认选中的值
        snapListIndex:0,          // snap多列的时候的当前列
        bouncing: true,           // 启用弹跳(内容可以慢慢移到外面，释放后再弹回来)
        speedRatio: 1,            // 增加或减少滚动速度
        scrollingComplete: ()=>{},   // 在触摸端或减速端后端触发的回调，前提是另一个滚动动作尚未开始。用于知道何时淡出滚动条
        snapComplete: ()=>{},     // snap 滑动完成后的执行事件
        peneDece: 0.07,           // 这配置了到达边界时应用于减速的更改量
        peneAcce: 0.08            // 这配置了到达边界时施加于加速度的变化量
    }
    const privateOptions = {
        scrollDirection : '',            // 滑动方向
        // 状态 {Boolean}
        isTracking : false,              // 触摸事件序列是否正在进行中
        completeDeceleration : false,    // 是否完成减速动画
        isDragging : false,              // 用户移动的距离是否已达到启用拖动模式的程度。 提示:只有在移动了一些像素后，才可以不被点击等打断。
        isDecelerating : false,          // 是否正在减速中
        isAnimating : false,             // 是否动画正在运行中
        enableScrollX : false,           // 是否开启横向滚动
        enableScrollY : false,           // 是否开启纵向向滚动
        refreshActive : false,           // 现在释放事件时是否启用刷新进程
        reachActive : false,             // 是否已经发送了触底事件
        snapAlignInit : false,           // 是否已经初始化了snap type : center
        interrupted : true,
        //  {Function}
        refreshStartCb : null,          // 执行回调以启动实际刷新
        refreshCancelCb : null,         // 在停用时执行的回调。这是为了通知用户刷新被取消
        refreshActiveCb : null,         // 回调函数，以在激活时执行。这是为了在用户释放时通知他即将发生刷新
        // {Number}
        scrollX : 0,         // 当前在x轴上的滚动位置
        scrollY : 0,         // 当前在y轴上的滚动位置
        minScrollX : 0,      // 最小允许横向滚动宽度
        minScrollY : 0,      // 最小允许纵向滚动高度
        maxScrollX : 0,      // 最大允许横向滚动宽度
        maxScrollY : 0,      // 最大允许纵向滚动高度
        prevScrollX : 0,    // 上一个横向滚动位置
        prevScrollY : 0,    // 上一个纵向滚动位置

        scheduledX : 0,     // 预定左侧位置(动画时的最终位置)
        scheduledY : 0,     // 预定的顶部位置(动画时的最终位置)
        lastTouchX : 0,     // 开始时手指的左侧位置
        lastTouchY : 0,     // 开始时手指的顶部位置
        lastTouchT : null,  // {Date} 手指最后移动的时间戳。用于限制减速速度的跟踪范围。
        velocityX : 0,      // 当前因素修改水平滚动的位置与每一步
        velocityY : 0,      // 当前因素修改垂直滚动位置与每一步

        refreshH : 0,       // 下拉刷新区域的高度
        loadingH : 0,       // 上拉加载区域的高度
        contentW : 0,       // 滚动内容宽度
        contentH : 0,       // 滚动内容高度
        containerW : 0,     // 可视容器宽度
        containerH : 0,     // 可视容器高度
        snapW : 50,         // 开启网格滑动时网格宽度
        snapH : 50,         // 开启网格滑动时网格高度

        minDeceX : 0,       // 最小减速时X滚动位置
        minDeceY : 0,       // 最小减速时Y滚动位置
        maxDeceX : 0,       // 最大减速时X滚动位置
        maxDeceY : 0,       // 最大减速时Y滚动位置
        // {Array} List
        touchArr : null    // 位置列表，每个状态使用三个索引=左、上、时间戳
    }
    return {
        queryOptions: Object.assign(queryOptions,options),
        privateOptions: privateOptions
    }
}

