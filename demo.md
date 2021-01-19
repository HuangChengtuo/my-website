---
# 主题列表：juejin, github, smartblue, cyanosis, channing-cyan, fancy, hydrogen, condensed-night-purple, greenwillow, v-green, vue-pro, healer-readable, mk-cute, jzman, geek-black, awesome-green, qklhk-chocolate
# 贡献主题：https://github.com/xitu/juejin-markdown-themes
theme: juejin
highlight:
---
想在自己的个人网站上实现一个劫持鼠标滚轮，实现鼠标滚轮翻页的效果，记录一下踩坑之路  
先来看看模仿目标 [明日方舟官网](https://ak.hypergryph.com/index)（上班摸鱼警告👓 ）

最终效果✌️  
![最终效果](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d3ccc97a99a8433785d368ef859351b4~tplv-k3u1fbpfcp-watermark.image)

## 拦截鼠标滚轮默认事件

本来是非常简单的 `addEventListener`
```js
window.addEventListener('mousewheel', scrollFn)

scrollFn(e: WheelEvent) {
  e.preventDefault()
  if(e.deltaY > 0) {
    向下滚动
    ...
  } else {
    向上滚动
    ...
  }
}
```
但是在浏览器上报了这样的错误

![报错](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8b90593a781e4af5b7cd91a7cf683f6e~tplv-k3u1fbpfcp-watermark.image)

而且默认的鼠标滚轮事件仍然能触发。。  
点进去翻了一下 chrome 的 [feature](https://www.chromestatus.com/feature/6662647093133312) ，发现 Event 多出来了一个 `passive` 属性，而且 WheelEvent 的 `passive` 默认为 true  
又翻了翻 `addEventListener` 的 [MDN](https://developer.mozilla.org/zh-cn/docs/web/api/eventtarget/addeventlistener) ，发现
```js
target.addEventListener(type, listener, options);
target.addEventListener(type, listener, useCapture);
```
啥时候多了一个 options 的语法。。  
百度了一番发现有许多的文章讲到 addEventListener 的 useCapture 用的人太少，15年底已经被规范为可选属性，并且能够传入对象  
`passive`的作用就是让 listener 禁止调用`preventDefault()`，修改后最终成功实现滚轮默认事件

现在回想起我17年大二在学校学前端，listener、事件冒泡讲课时的场景，连`preventDefault`都没提到，更别提还会有新规范这种事了。。


## 第一次尝试 scroll-behavior: smooth

使用 css 属性`scroll-behavior: smooth`是最方便最简单的，效果也比第二次要好很多，但是 mac 上 safari 不支持这一特性，ios 上的 safari 却又支持😓

```js
scrollFn(e: WheelEvent) {
  e.preventDefault()
  // 获取视窗高度
  const windowHeight = window.innerHeight || document.body.clientHeight
  // 计算 banner 高度，css 属性为80vh
  const scrollHeight = windowHeight * 0.8
  window.scrollTo(0, e.deltaY > 0 ? scrollHeight : 0)
}
```
![css](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/66e8c9145788423d9902b8f026841533~tplv-k3u1fbpfcp-watermark.image)  
发现了更方便的方法`window.scrollTo({ top: 1000, behavior: "smooth" })`尝试了一下，safari 也不支持

## 第二次尝试 requestAnimationFrame

通过使用 requestAnimationFrame 方法来进行滚动动画操作，在浏览器重绘之前调用动画函数，一般根据显示器的帧数来进行调用，通常是每秒60次，在我的小米10上能够达到每秒90次😄
```js
scrollFn(e: WheelEvent) {
  e.preventDefault()
  let start = 0
  // 动画函数，需要闭包访问 start
  const step = (unix: number) => {
    if (!start) {
      start = unix
    }
    const duration = unix - start
    // 获取视窗高度
    const windowHeight = window.innerHeight || document.body.clientHeight
    // 计算 banner 高度，css 属性为80vh
    const scrollHeight = windowHeight * 0.8
    // 在当前时间应该滚动的距离
    const nowY = scrollHeight / 1000 * duration
    window.scrollTo(0, e.deltaY > 0 ? nowY : scrollHeight - nowY)
    // 1000ms
    if (duration < 1000) {
      requestAnimationFrame(step)
    } 
  }
  requestAnimationFrame(step)
}
```
敲完代码一看，效果有点拉胯  
这动画效果直上直下，太呆了

![requestAnimationFrame](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/68d6187af74e4342a790d4d11cc46f1d~tplv-k3u1fbpfcp-watermark.image)

## 第三次尝试 


