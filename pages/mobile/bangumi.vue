<template>
  <div id="mobile-bangumi">
    <NuxtLink to="/mobile">
      <img src="https://s1.huangchengtuo.com/img/AF.png" alt="af" class="header">
    </NuxtLink>
    <div class="main">
      <div class="title">今日新番表</div>
      <div v-for="item of bangumi" :key="item.title" class="bangumi aic" :class="{now:item.now}">
        <span class="name one-line">{{ item.titleTranslate?.['zh-Hans']?.[0] || item.title }}</span>
        <span class="roboto-font">{{ $formatTime(item.chineseBegin || item.begin, 'HH:mm') }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import dayjs from 'dayjs'
import api from '@/api'
import type { Bangumi } from '@/interface'

definePageMeta({ layout: 'mobile' })

const rawBangumi = ref<Bangumi[]>([])

onMounted(() => {
  api.getBangumi().then(res => {
    rawBangumi.value = res
  })
})

const bangumi = computed<Bangumi[]>(() => {
  const chinesePlatform = ['acfun', 'bilibili', 'sohu', 'youku', 'qq', 'iqiyi', 'letv', 'pptv', 'mgtv', 'dmhy']
  const result: Bangumi[] = []
  for (const item of rawBangumi.value) {
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
