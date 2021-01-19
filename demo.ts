scrollFn(e: WheelEvent) {
  e.preventDefault()
  // 正在滚动中，或者到最后一页还向下滚，或者第一页还向上滚
  if (this.debounce || (e.deltaY > 0 && this.index >= 1) || (e.deltaY < 0 && this.index === 0)) {
    return
  }
  let start = 0
  // 动画函数，需要闭包访问 start 就没有分离出来
  const step = (unix: number) => {
    if (!start) {
      start = unix
    }
    const duration = unix - start
    const windowHeight = window.innerHeight || document.body.clientHeight
    const scrollHeight = windowHeight * 0.8
    const y = this.easeInOutCubic(duration / 1000) * scrollHeight
    window.scrollTo(0, e.deltaY > 0 ? y : scrollHeight - y)
    if (duration <= 1001) {
      requestAnimationFrame(step)
      this.debounce = true
    } else {
      this.debounce = false
      e.deltaY > 0 ? this.index++ : this.index--
      console.log(this.index)
    }
  }
  requestAnimationFrame(step)
},
// 缓动函数 https://easings.net#easeInOutCubic
easeInOutCubic(x: number): number {
  return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
}