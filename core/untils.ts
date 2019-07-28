/*================================================
 * 主要定义了一些工具方法
 *==============================================*/

// 判断是否有触摸事件
export function isTouches(touches: TouchList) :void{
    if (touches.length == null) {
        throw new Error("Invalid touch list: " + touches);
    }
}
// 判断是否有触摸时间戳
export function isTouchesTime(timeStamp) :void{
    if (timeStamp instanceof Date) {
        timeStamp = timeStamp.valueOf();
    }
    if (typeof timeStamp !== "number") {
        throw new Error("Invalid timestamp value: " + timeStamp);
    }
}
// 缓动函数
export function easeOutCubic(pos:number) : number {
    return (Math.pow((pos - 1), 3) + 1);
}
// 缓动函数
export function easeInOutCubic(pos:number) : number {
    if ((pos /= 0.5) < 1) {
      return 0.5 * Math.pow(pos, 3);
    }
    return 0.5 * (Math.pow((pos - 2), 3) + 2);
}
// 获取节点
export function getElement(selector: string | HTMLElement ): HTMLElement {
    let element: HTMLElement;
    if(typeof selector === 'string'){
        element = document.querySelector(selector);
    } else if(typeof selector === 'object' && selector.nodeType === 1) {
        element = selector
    }
    return element
}

// 是否可以减速
export function canDeceleration(options:options,params:object):boolean{
    let m = this
    let flag = false
    // 然后计算出100毫秒前滚动的位置
    let endPos = options.touchArr.length - 1;
    let startPos = endPos;
    // 将指针移动到100ms前测量的位置
    for (let i = endPos; i > 0 && m._touchArr[i] > (m._lastTouchT - 100); i -= 3) {
      startPos = i;
    }
    // 如果开始和停止位置在100ms时间内相同，我们无法计算任何有用的减速。
    if (startPos !== endPos) {
      // 计算这两点之间的相对运动
      let timeOffset = m._touchArr[endPos] - m._touchArr[startPos];
      let movedX = m.scrollX - m._touchArr[startPos - 2];
      let movedY = m.scrollY - m._touchArr[startPos - 1];
      // 基于50ms计算每个渲染步骤的移动
      m._velocityX = movedX / timeOffset * (1000 / 60);
      m._velocityY = movedY / timeOffset * (1000 / 60);
      // 开始减速需要多少速度
      let minVelocityToStartDeceleration = m.ops.paging || m.ops.snap ? 4 : 1;
      // 验证我们有足够的速度开始减速
      let isVelocityX = Math.abs(m._velocityX) > minVelocityToStartDeceleration
      let isVelocityY = Math.abs(m._velocityY) > minVelocityToStartDeceleration
      if (isVelocityX || isVelocityY) {
        flag = true
      }
    }
    return flag
  }