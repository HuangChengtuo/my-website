<template>
  <div id="home-page">
    <div class="banner"></div>
    <nuxt-link to="sort-app">go</nuxt-link>
    <h1 class="title">黄秤砣的小站</h1>
    <div style="background: #000000">a</div>
    <a href="https://alphardex.github.io/gateofbabylon" target="_blank" class="download-btn">copy</a>

    <div style="height: 2000px"></div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  layout: 'null',
  data() {
    return {
      posistion: 0,
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
    scrollFn(e: any) {
      e.preventDefault()
      if (this.debounce) {
        return
      }
      let start = 0
      // 动画函数，需要闭包访问start
      const step = (unix: number) => {
        if (!start) {
          start = unix
        }
        const duration = unix - start
        const windowHeight = window.innerHeight || document.body.clientHeight
        const scrollHeight = windowHeight * 0.8
        const nowY = scrollHeight / 750 * duration
        window.scrollTo(0, e.deltaY > 0 ? nowY : scrollHeight - nowY)
        if (duration < 750) {
          requestAnimationFrame(step)
          this.debounce = true
        } else {
          this.debounce = false
        }
      }
      requestAnimationFrame(step)
    }
  }
})
</script>

<style lang="scss" scoped>
#home-page {
  .banner {
    height: 80vh;

    background: {
      image: url("/img/AF.png");
      attachment: fixed;
      position-x: right;
      position-y: top;
      size: auto 100vw;
    }
  }

  .title {
    line-height: 20vh;
    font-weight: bold;
    text-align: center;
    font-size: 3rem;
  }
}
</style>
