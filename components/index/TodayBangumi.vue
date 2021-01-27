<template>
  <div class="bangumi">
    今日新番
    <div v-for="item of bangumi" :key="item.title">
      {{ week(item.begin) }}
      {{ item.title }}
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
    bangumi() {
      const result = []
      for (const item of this.rawBangumi) {
        const hasCopyright = item.sites.some(e => this.chinesePlatform.includes(e.site))
        if (hasCopyright) {
          item.hasCopyright = hasCopyright
          item.begin = item.sites.find(e => this.chinesePlatform.includes(e.site)).begin || item.begin
        }
        result.push(item)
      }
      return result
    }
  },
  methods: {
    week(date: string) {
      return dayjs(date).day()
    }
  }
})
</script>

<style scoped>

</style>