<template>
  <div id="mobile-bangumi">
    <nuxt-link to="/mobile">
    <img src="https://s1.huangchengtuo.com/img/AF.png" alt="af" class="header" />
    </nuxt-link>
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
  layout: 'mobile',
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
#mobile-bangumi {
  .header {
    width: 100vw;
    height: 100vw;
    object-fit: cover;
    position: fixed;
    top: 0;
    left: 0;
    z-index: -1;
  }

  .main {
    margin-top: 100vw;
    min-height: 100vh;
    background: #ffffff;

    .title {
      font-weight: bold;
      color: #000000;
      font-size: 60rem;
      padding: 16rem 0;

      .sub {
        font-size: 40rem;
        font-weight: normal;
      }
    }

    .bangumi {
      padding: 0 20rem;
      .name {
        width: 600rem;
      }

      .roboto-font {
        margin-left: auto;
      }
    }

    .bangumi.now {
      margin: 4rem 0;
      color: #73c9e5;
    }
  }
}
</style>
