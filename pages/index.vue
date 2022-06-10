<template>
  <div id="home-page">
    <div class="banner" />
    <main class="main">
      <h1 class="title">黄秤砣</h1>
      <div class="jcsb">
        <TodayBangumi class="card" />
        <Card class="card" href="http://blog.huangchengtuo.com" title="我的博客" src="https://s1.huangchengtuo.com/img/DD.png" />
        <Card class="card" href="http://react.huangchengtuo.com" title="我的工具箱" src="https://s1.huangchengtuo.com/img/0425react.png" />
      </div>
    </main>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import TodayBangumi from '@/views/index/TodayBangumi.vue'
import Card from '@/views/index/Card.vue'

definePageMeta({ layout: false })

export default defineComponent({
  components: { TodayBangumi, Card },
  data () {
    return {
      // 各模块边界位置，单位为vh，mounted时根据视窗转化为对应px
      position: [0, 0.8, 1.8],
      debounce: false,
    }
  },
  mounted () {
    if (navigator.userAgent.match(/iPhone|Android|iPad/)) {
      this.$router.push('/mobile')
      return
    }
    const windowHeight = window.innerHeight || document.body.clientHeight
    // 根据vh转化为px
    this.position = this.position.map(ele => Math.ceil(windowHeight * ele))
    window.addEventListener('mousewheel', this.wheelFn, { passive: false })
  },
  beforeUnmount () {
    window.removeEventListener('mousewheel', this.wheelFn)
  },
  methods: {
    wheelFn (e: WheelEvent) {
      e.preventDefault()
      const nowY = window.scrollY
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
      console.log('move', scrollHeight)
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
  background: #ededed;

  .banner {
    height: 80vh;

    background: {
      color: #f0f0f0;
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
      line-height: 18vh;
      font-weight: bold;
      text-align: center;
      font-size: 3rem;
      color: #303133;
      margin: 0;
    }

    .card {
      border-radius: 50px;
      background: #f0f0f0;
      box-shadow: 5px 5px 10px #cccccc, -5px -5px 10px #ffffff;
      width: 360px;
      min-height: 360px;
      padding: 24px 16px 36px;
      color: #303133;
      transition: all 0.3s;

      .card-title {
        line-height: 32px;
        margin-bottom: 18px;
        font-weight: 500;
        font-size: 24px;
        text-align: center;
      }

      &:hover {
        box-shadow: 16px 16px 32px #cccccc, -16px -16px 32px #ffffff;
      }
    }
  }
}
</style>
