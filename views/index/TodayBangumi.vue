<template>
  <NuxtLink to="/bangumi" class="today-bangumi">
    <div class="card-title">今日新番表</div>
    <div v-for="item of bangumi" :key="item.title" class="bangumi aic" :class="{ now: item.now }">
      <span class="name one-line">{{ item.titleTranslate?.['zh-Hans']?.[0] || item.title }}</span>
      <span class="roboto-font">{{ $formatTime(item.chineseBegin || item.begin, 'HH:mm') }}</span>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import dayjs from 'dayjs'
import api from '@/api'
import type { Bangumi } from '@/interface'

const rawBangumi = ref<Bangumi[]>([])

onMounted(() => {
  api.get('https://s1.huangchengtuo.com/json/bangumi.json').then(res => {
    rawBangumi.value = res
  })
})

const bangumi = computed(() => {
  const chinesePlatform = ['acfun', 'bilibili', 'sohu', 'youku', 'qq', 'iqiyi', 'letv', 'pptv', 'mgtv', 'dmhy']
  const result: Bangumi[] = []
  for (const item of rawBangumi.value) {
    // 国内版权
    item.chineseBegin = item?.sites?.find?.(e => chinesePlatform.includes(e.site))?.begin || ''
    if (dayjs(item.chineseBegin || item.begin).day() === dayjs().day()) {
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
})
</script>

<style lang="scss" scoped>
.today-bangumi {
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
