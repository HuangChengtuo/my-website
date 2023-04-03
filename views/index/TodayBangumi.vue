<template>
  <NuxtLink to="/bangumi" class="today-bangumi">
    <div class="card-title">今日新番表</div>
    <div v-for="item of bangumi" :key="item.title" class="bangumi aic" :class="{ now: item.now }">
      <span class="name one-line">{{ item.titleTranslate?.['zh-Hans']?.[0] || item.title }}</span>
      <span class="roboto-font">{{ $formatTime(item.begin, 'HH:mm') }}</span>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import dayjs from 'dayjs'
import api from '@/api'
import type { Bangumi } from '@/interface'

const bangumi = ref<Bangumi[]>([])

onMounted(() => {
  api.getBangumi().then(res => {
    const result: Bangumi[] = [{ title: '---- 现在 ----', now: true, begin: dayjs().toISOString() }]
    for (const item of res) {
      if (dayjs(item.begin).day() === dayjs().day()) {
        result.push(item)
      }
    }
    result.sort((a, b) => {
      const timeA = +dayjs(a.begin).format('HHmmss')
      const timeB = +dayjs(b.begin).format('HHmmss')
      return timeA - timeB
    })
    bangumi.value = result
  })
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
