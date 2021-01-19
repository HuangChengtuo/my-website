scrollFn(e: WheelEvent) {
  e.preventDefault()
  let start = 0
  // 动画函数，需要闭包访问start
  const step = (unix: number) => {
    if (!start) {
      start = unix
    }
    const duration = unix - start
    const windowHeight = window.innerHeight || document.body.clientHeight
    const scrollHeight = windowHeight * 0.8
    const nowY = scrollHeight / 1000 * duration
    window.scrollTo(0, e.deltaY > 0 ? nowY : scrollHeight - nowY)
    if (duration < 1000) {
      requestAnimationFrame(step)
    } 
  }
  requestAnimationFrame(step)
}