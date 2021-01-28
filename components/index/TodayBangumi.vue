<template>
  <div class="bangumi">
    今日新番
    <div v-for="item of bangumi" :key="item.title">
      {{ $formatTime(item.begin) }}
      {{ showTitle(item) }}
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import rawBangumi from '@/static/json/bangumi.json'
import dayjs from 'dayjs'

export default Vue.extend({
  data() {
    return {
      chinesePlatform: ['bilibili', 'acfun', 'qq', 'iqiyi'],
      rawBangumi
    }
  },
  computed: {
    bangumi(): Bangumi[] {
      const result = []
      for (const item of this.rawBangumi) {
        // 国内版权
        const hasCopyright = item.sites.some(e => this.chinesePlatform.includes(e.site))
        if (hasCopyright) {
          // 替换为国内开播时间
          item.hasCopyright = hasCopyright
          item.begin = item.sites.find(e => this.chinesePlatform.includes(e.site)).begin || item.begin
        }
        // 今日更新
        if (dayjs(item.begin).day() === dayjs().day()) {
          result.push(item)
        }
      }
      return result
    }
  },
  mounted() {
    console.log(this.bangumi)
  },
  methods: {
    showTitle(item: Bangumi) {
      return item.titleTranslate['zh-Hans']?.[0] || item.title
    }
  }
})
</script>

<style scoped>

</style>