<template>
  <nuxt-link to="/bangumi" class="today-bangumi">
    <div class="card-title">
      今日新番表
      <span class="sub">(国内)</span>
    </div>
    <div v-for="item of bangumi" :key="item.title" class="bangumi aic" :class="{now:item.now}">
      <span class="name one-line">{{ showTitle(item) }}</span>
      <span class="roboto-font">{{ $formatTime(item.chineseBegin || item.begin, 'HH:mm') }}</span>
    </div>
  </nuxt-link>
</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue'
import dayjs from 'dayjs'

export default Vue.extend({
  props: { rawBangumi: Array as PropOptions<Bangumi[]> },
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
        if (dayjs(item.chineseBegin || item.begin).day() === dayjs().day() && item.hasCopyright) {
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
  methods: {
    showTitle(item: Bangumi) {
      return item.titleTranslate?.['zh-Hans']?.[0] || item.title
    }
  }
})
</script>

<style lang="scss" scoped>
.today-bangumi {
  .card-title {
    .sub {
      font-size: 14px;
      font-weight: normal;
    }
  }

  .bangumi {
    .name {
      width: 300px;
    }

    .roboto-font {
      margin-left: auto;
    }
  }

  .bangumi.now {
    margin: 8px 0;
    text-align: center;
    color: #73c9e5;
  }
}
</style>