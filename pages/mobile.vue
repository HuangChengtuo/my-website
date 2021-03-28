<template>
  <div id="mobile">
    <img src="https://s1.huangchengtuo.com/img/AF.png" alt="af" class="header" />
    <div class="main">
      <div class="title">
        今日新番表
        <span class="sub">(国内)</span>
      </div>
      <div v-for="item of bangumi" :key="item.title" class="bangumi aic" :class="{now:item.now}">
        <span class="name one-line">{{ showTitle(item) }}</span>
        <span class="roboto-font">{{ $formatTime(item.chineseBegin || item.begin, 'HH:mm') }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import dayjs from "dayjs"

export default Vue.extend({
  async asyncData({ $api }) {
    const rawBangumi = await $api.get('https://s1.huangchengtuo.com/json/bangumi.json')
    return { rawBangumi }
  },
  layout: 'null',
  data() {
    return {
      width: 0,
      height: 0,
      rawBangumi: []
    }
  },
  computed: {
    bangumi(): Bangumi[] {
      const chinesePlatform = ["acfun", "bilibili", "sohu", "youku", "qq", "iqiyi", "letv", "pptv", "mgtv", "dmhy"]
      const result = []
      for (const item of this.rawBangumi) {
        // 国内版权
        const hasCopyright = item.sites.some(e => chinesePlatform.includes(e.site))
        if (hasCopyright) {
          // 新增国内开播时间字段
          item.hasCopyright = hasCopyright
          item.chineseBegin = item.sites.find(e => chinesePlatform.includes(e.site)).begin
        }
        // 今日国内版权更新
        if (dayjs(item.chineseBegin || item.begin).day() === dayjs().day() && hasCopyright) {
          result.push(item)
        }
      }
      result.push({ title: '---- 现在 ----', now: true, begin: dayjs().toISOString() })
      result.sort((a, b) => {
        const timeA = dayjs(a.chineseBegin || a.begin).format('HHmmss')
        const timeB = dayjs(b.chineseBegin || b.begin).format('HHmmss')
        return Number(timeA) - Number(timeB)
      })
      return result
    }
  },
  mounted() {
    this.width = document.body.clientWidth
    this.height = document.body.clientHeight
  },
  methods: {
    showTitle(item: Bangumi) {
      return item.titleTranslate?.['zh-Hans']?.[0] || item.title
    }
  }
})
</script>

<style lang="scss">
html {
  // 375px除以100等于100vw除以font-size，得到font-size等于26.6666666vw
  // 375px除以100等于1(100%)除以font-size，得到font-size等于.266666666vw
  font-size: 0.26666666666vw;
}

body {
  font-size: 20rem;
}

#mobile {
  .header {
    width: 100vw;
    height: 100vw;
    object-fit: cover;
    position: fixed;
    top: 0;
    z-index: -1;
  }

  .main {
    margin-top: 100vw;
    min-height: 100vh;
    background: #ffffff;

    .title {
      text-align: center;
      font-weight: bold;
      color: #000000;
      font-size: 30rem;
      padding: 8rem 0;

      .sub {
        font-size: 20rem;
        font-weight: normal;
      }
    }

    .bangumi {
      padding: 0 10rem;
      .name {
        width: 300rem;
      }

      .roboto-font {
        margin-left: auto;
      }
    }

    .bangumi.now {
      margin: 2rem 0;
      text-align: center;
      color: #73c9e5;
    }
  }
}
</style>