<template>
  <div id="home-page">
    <div class="banner"></div>
    <nuxt-link to="sort-app">go</nuxt-link>
    <main class="main">
      <h1 class="title">黄秤砣的小站</h1>
      <a href="https://alphardex.github.io/gateofbabylon" target="_blank" class="download-btn">copy</a>
    </main>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  layout: 'null',
  data() {
    return {
      index: 0,
      debounce: false
    }
  },
  mounted() {
    window.addEventListener('mousewheel', this.scrollFn, { passive: false })
  },
  beforeDestroy() {
    window.removeEventListener('mousewheel', this.scrollFn)
  },
  methods: {
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
        if (duration <= 1000) {
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
  }
})
</script>

<style lang="scss" scoped>
#home-page {
  .banner {
    height: 80vh;

    background: {
      color: #bdb6bb;
      image: url("/img/AF.png");
      attachment: fixed;
      position-x: right;
      position-y: top;
      size: auto 100vw;
    }
  }

  .main {
    height: 99vh;

    .title {
      line-height: 20vh;
      font-weight: bold;
      text-align: center;
      font-size: 3rem;
    }
  }
}
</style>
