<template>
  <div id="home-page">
    <div class="banner"></div>
    <main class="main">
      <h1 class="title">黄秤砣</h1>
      <div class="jcsb">
        <TodayBangumi class="card" :raw-bangumi="bangumi" />
        <Card class="card" href="http://blog.huangchengtuo.com" title="我的博客" src="https://s1.huangchengtuo.com/img/DD.png" />
        <Card class="card" href="http://react.huangchengtuo.com" title="我的工具箱" src="https://s1.huangchengtuo.com/img/0425react.png" />
      </div>
    </main>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import TodayBangumi from '@/modules/index/TodayBangumi.vue'
import Card from '@/modules/index/Card.vue'

interface Data {
  position: number[],
  debounce: boolean,
  bangumi: Bangumi[]
}

export default Vue.extend({
  async asyncData ({ $api, req, redirect }) {
    const ua = req?.headers?.['user-agent'] || navigator.userAgent
    if (ua.match(/iPhone|Android|iPad/)) {
      redirect('/mobile')
      return
    }
    const bangumi = await $api.get('https://s1.huangchengtuo.com/json/bangumi.json')
    return { bangumi }
  },
  layout: 'null',
  components: { TodayBangumi, Card },
  data (): Data {
    return {
      // 各模块边界位置，单位为vh，mounted时根据视窗转化为对应px
      position: [0, 0.8, 1.8],
      debounce: false,
      bangumi: []
    }
  },
  mounted () {
    const windowHeight = window.innerHeight || document.body.clientHeight
    // 根据vh转化为px
    this.position = this.position.map(ele => Math.floor(windowHeight * ele))
    window.addEventListener('mousewheel', this.wheelFn, { passive: false })
  },
  beforeDestroy () {
    window.removeEventListener('mousewheel', this.wheelFn)
  },
  methods: {

    wheelFn (e: WheelEvent) {
      e.preventDefault()
      const nowY = window.pageYOffset
      // 正在滚动中
      if (this.debounce) {
        return
      }
      const { index, between } = this.calcNowPosition(nowY)
      // 滚轮是向下还是向上
      const down = e.deltaY > 0
      this.debounce = true
      let start = 0

      let scrollHeight = 0
      if (down) {
        // 向下滚，滚动高度等于下一个位置与现在的差值
        scrollHeight = this.position[index + 1] - nowY
      } else {
        // 向上滚，夹在中间需滚动上一个边界与现在的差值，在边界就滚动一个完整距离
        scrollHeight = between ? (nowY - this.position[index]) : (this.position[index] - this.position[index - 1])
      }
      // 动画函数，需要闭包访问 start 就没有分离出来
      const step = (unix: number) => {
        if (!start) {
          start = unix
        }
        const duration = unix - start
        const y = this.easeInOutCubic(duration / 1000) * scrollHeight
        window.scrollTo(0, down ? nowY + y : nowY - y)
        if (duration <= 1001) {
          requestAnimationFrame(step)
        } else {
          this.debounce = false
        }
      }
      requestAnimationFrame(step)
    },
    // 计算现在在哪个位置，是正好对准边界还是夹在中间
    calcNowPosition (nowY: number): { index: number, between: boolean } {
      for (let i = 0; i < this.position.length; i++) {
        if (this.position[i] > nowY) {
          return { index: i - 1, between: this.position[i - 1] !== nowY }
        }
      }
      return { index: this.position.length - 1, between: false }
    },
    // 缓动函数 https://easings.net#easeInOutCubic
    easeInOutCubic (x: number): number {
      return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2
    }
  }
})
</script>

<style lang="scss">
#home-page {
  .banner {
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
      min-height: 384px;
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
