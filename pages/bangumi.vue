<template>
  <div id="bangumi" class="layout-default-body">
    <el-tabs v-model="day">
      <el-tab-pane name="1" label="周一" />
      <el-tab-pane name="2" label="周二" />
      <el-tab-pane name="3" label="周三" />
      <el-tab-pane name="4" label="周四" />
      <el-tab-pane name="5" label="周五" />
      <el-tab-pane name="6" label="周六" />
      <el-tab-pane name="0" label="周日" />
    </el-tabs>
    <el-table :data="bangumi">
      <el-table-column label="番剧">
        <template #default="scope">{{ scope.row.titleTranslate?.['zh-Hans']?.[0] || scope.row.title }}</template>
      </el-table-column>
      <el-table-column label="放送时间" width="200px" align="center">
        <template #default="scope">
          <div class="roboto-font">{{ $formatTime(scope.row.chineseBegin || scope.row.begin, 'HH:mm') }}</div>
        </template>
      </el-table-column>
      <el-table-column label="国内放送" width="350px" align="center">
        <template #default="scope">
          <a v-for="item of showSites(scope.row.sites)" :key="item.title" :href="item.url" target="_blank" class="link">{{ item.title }}</a>
          <span v-if="!showSites(scope.row.sites).length" style="color:gainsboro">暂无</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import dayjs from 'dayjs'
import api from '@/api'
import type { Bangumi, Site } from '@/interface'

definePageMeta({ layoutTransition: false })

const day = ref(dayjs().day().toString())
const rawBangumi = ref<Bangumi[]>([])

onMounted(async () => {
  const chinesePlatform = ['acfun', 'bilibili', 'sohu', 'youku', 'qq', 'iqiyi', 'letv', 'pptv', 'mgtv', 'dmhy']
  const res: Bangumi[] = await api.get('https://s1.huangchengtuo.com/json/bangumi.json')
  for (const item of res) {
    // 新增国内开播时间字段
    item.chineseBegin = item.sites.find(e => chinesePlatform.includes(e.site))?.begin || ''
  }
  rawBangumi.value = res
})

const bangumi = computed(() => {
  const result: Bangumi[] = []
  for (const item of rawBangumi.value) {
    if (dayjs(item.chineseBegin || item.begin).day() === +day.value) {
      result.push(item)
    }
  }
  result.sort((a, b) => {
    const timeA = dayjs(a.chineseBegin || a.begin).format('HHmmss')
    const timeB = dayjs(b.chineseBegin || b.begin).format('HHmmss')
    return Number(timeA) - Number(timeB)
  })
  return result
})

const siteMeta: Record<string, { title: string, urlTemplate: string }> = {
  'acfun': { 'title': 'AcFun', 'urlTemplate': 'https://www.acfun.cn/bangumi/aa{{id}}' },
  'bilibili': { 'title': '哔哩哔哩', 'urlTemplate': 'https://www.bilibili.com/bangumi/media/md{{id}}/' },
  'sohu': { 'title': '搜狐视频', 'urlTemplate': 'https://tv.sohu.com/{{id}}' },
  'youku': { 'title': '优酷', 'urlTemplate': 'https://list.youku.com/show/id_z{{id}}.html' },
  'qq': { 'title': '腾讯视频', 'urlTemplate': 'https://v.qq.com/detail/{{id}}.html' },
  'iqiyi': { 'title': '爱奇艺', 'urlTemplate': 'https://www.iqiyi.com/{{id}}.html' },
  'letv': { 'title': '乐视', 'urlTemplate': 'https://www.le.com/comic/{{id}}.html' },
  'pptv': { 'title': 'PPTV', 'urlTemplate': 'http://v.pptv.com/page/{{id}}.html' },
  'mgtv': { 'title': '芒果tv', 'urlTemplate': 'https://www.mgtv.com/h/{{id}}.html' },
  'dmhy': { 'title': '动漫花园', 'urlTemplate': 'https://share.dmhy.org/topics/list?keyword={{id}}' }
}

function showSites (arr: Site[]) {
  const result: { title: string, url: string }[] = []
  for (const item of arr) {
    if (siteMeta[item.site]) {
      const abbr = siteMeta[item.site]
      result.push({ title: abbr.title, url: abbr.urlTemplate.replace('{{id}}', item.id) })
    }
  }
  return result
}
</script>

<style lang="scss">
#bangumi {
  padding-bottom: 32px;

  .link + .link {
    margin-left: 5px;
  }
}
</style>
