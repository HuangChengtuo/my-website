<template>
  <div id="home-page">
    <header class="header"></header>
    <main class="main">
      <h1 class="title">黄秤砣</h1>
      <div class="jcsb">
        <!--腾讯云服务端时间不正常-->
        <client-only>
          <TodayBangumi class="card" :raw-bangumi="bangumi" />
        </client-only>
        <Blog class="card" />
        <div class="card">
          <nuxt-link to="/playground">playground</nuxt-link>
        </div>
      </div>
    </main>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import TodayBangumi from '@/components/index/TodayBangumi.vue'
import Blog from '@/components/index/Blog.vue'

export default Vue.extend({
  async asyncData({ $api }) {
    const bangumi = await $api.get('https://s1.huangchengtuo.com/json/bangumi.json')
    return { bangumi }
  },
  layout: 'null',
  components: { TodayBangumi, Blog },
  data() {
    return {
      index: 0,
      position: [0],
      debounce: false,
      bangumi: []
    }
  },
  mounted() {
    // 确定页面的高度以及模块位置
    this.position[1] = (window.innerHeight || document.body.clientHeight) * 0.8
    window.addEventListener('mousewheel', this.wheelFn, { passive: false })
  },
  beforeDestroy() {
    window.removeEventListener('mousewheel', this.wheelFn)
  },
  methods: {
    wheelFn(e: WheelEvent) {
      e.preventDefault()
      // 正在滚动中，或者到最后一页还向下滚，或者第一页还向上滚
      if (this.debounce || (e.deltaY > 0 && this.index >= 1) || (e.deltaY < 0 && this.index === 0)) {
        return
      }
      const nowPosition = window.pageYOffset
      const down = e.deltaY > 0
      const windowHeight = window.innerHeight || document.body.clientHeight
      const scrollHeight = windowHeight * 0.8
      let start = 0
      // 动画函数，需要闭包访问 start 就没有分离出来
      const step = (unix: number) => {
        if (!start) {
          start = unix
        }
        const duration = unix - start
        const y = this.easeInOutCubic(duration / 1000) * scrollHeight
        window.scrollTo(0, down ? y : scrollHeight - y)
        if (duration <= 1001) {
          requestAnimationFrame(step)
          this.debounce = true
        } else {
          this.debounce = false
          e.deltaY > 0 ? this.index++ : this.index--
        }
      }
      requestAnimationFrame(step)
    },
    // 缓动函数 https://easings.net#easeInOutCubic
    easeInOutCubic(x: number): number {
      return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2
    }
  }
})
</script>

<style lang="scss">
#home-page {
  .header {
    height: 80vh;

    background: {
      color: #bdb6bb;
      image: url("https://s1.huangchengtuo.com/img/AF.png");
      attachment: fixed;
      position: right top;
      size: auto 100vw;
    }
  }

  .main {
    height: 100vh;
    width: 1200px;
    margin: 0 auto;

    .title {
      line-height: 20vh;
      font-weight: bold;
      text-align: center;
      font-size: 3rem;
    }

    .card {
      box-shadow: 0 0 10px rgba(168, 182, 191, 0.6);
      width: 384px;
      min-height: 300px;
      padding: 24px 16px 16px;
      color: #000000;
      transition: all 0.3s linear;

      .card-title {
        line-height: 32px;
        margin-bottom: 18px;
        font-weight: 500;
        font-size: 24px;
        text-align: center;
      }

      &:hover {
        transform: translateY(-5px);
        box-shadow: 0 10px 32px rgba(168, 182, 191, 0.6);
      }
    }
  }
}
</style>
