// 验证触摸事件
export const isTouch = (timeStamp: number, touches?: TouchList) => {
    if (touches && !touches.length) {
        throw new Error('Invalid touch list: ' + touches);
    }
    if (typeof timeStamp !== 'number') {
        throw new Error('Invalid timestamp value: ' + timeStamp);
    }
};

// 缓动函数
export const easeOut = (pos: number) => {
    return Math.pow(pos - 1, 3) + 1;
};

export const easeInOut = (pos: any) => {
    if ((pos /= 0.5) < 1) {
        return 0.5 * Math.pow(pos, 3);
    }
    return 0.5 * (Math.pow(pos - 2, 3) + 2);
};

// 渲染函数
export const render = (el: Node) => {
    return function (left:number, top:number) {
        el.style.transform = 'translate3d(' + (-left) + 'px,' + (-top) + 'px,0)';
    };
}
