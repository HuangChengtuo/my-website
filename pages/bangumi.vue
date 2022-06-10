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
    <el-table :data="showBangumi">
      <el-table-column label="番剧">
        <template v-slot="scope">{{ showTitle(scope.row) }}</template>
      </el-table-column>
      <el-table-column label="放送时间" width="200px" align="center">
        <template v-slot="scope">
          <div class="roboto-font">{{ $formatTime(scope.row.chineseBegin || scope.row.begin, 'HH:mm') }}</div>
        </template>
      </el-table-column>
      <el-table-column label="国内放送" width="350px" align="center">
        <template v-slot="scope">
          <a v-for="item of showSites(scope.row.sites)" :key="item.title" :href="item.url" target="_blank" class="link">{{ item.title }}</a>
          <span v-if="!showSites(scope.row.sites).length" style="color:gainsboro">暂无</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import dayjs from 'dayjs'
import api from '@/api'
import type { Bangumi, Site } from '@/interface'

definePageMeta({ layoutTransition: false })

export default defineComponent({
  props: { text: String },
  data () {
    return {
      day: dayjs().day().toString(),
      bangumi: [] as Bangumi[],
      siteMeta: {
        "acfun": { "title": "AcFun", "urlTemplate": "https://www.acfun.cn/bangumi/aa{{id}}", "type": "onair" },
        "bilibili": { "title": "哔哩哔哩", "urlTemplate": "https://www.bilibili.com/bangumi/media/md{{id}}/", "type": "onair" },
        "sohu": { "title": "搜狐视频", "urlTemplate": "https://tv.sohu.com/{{id}}", "type": "onair" },
        "youku": { "title": "优酷", "urlTemplate": "https://list.youku.com/show/id_z{{id}}.html", "type": "onair" },
        "qq": { "title": "腾讯视频", "urlTemplate": "https://v.qq.com/detail/{{id}}.html", "type": "onair" },
        "iqiyi": { "title": "爱奇艺", "urlTemplate": "https://www.iqiyi.com/{{id}}.html", "type": "onair" },
        "letv": { "title": "乐视", "urlTemplate": "https://www.le.com/comic/{{id}}.html", "type": "onair" },
        "pptv": { "title": "PPTV", "urlTemplate": "http://v.pptv.com/page/{{id}}.html", "type": "onair" },
        "mgtv": { "title": "芒果tv", "urlTemplate": "https://www.mgtv.com/h/{{id}}.html", "type": "onair" },
        "dmhy": { "title": "动漫花园", "urlTemplate": "https://share.dmhy.org/topics/list?keyword={{id}}", "type": "resource" }
      } as Record<string, { title: string, type: string, urlTemplate: string }>
    }
  },
  computed: {
    showBangumi (): Bangumi[] {
      const result = []
      for (const item of this.bangumi) {
        if (dayjs(item.chineseBegin || item.begin).day() === +this.day) {
          result.push(item)
        }
      }
      result.sort((a, b) => {
        const timeA = dayjs(a.chineseBegin || a.begin).format('HHmmss')
        const timeB = dayjs(b.chineseBegin || b.begin).format('HHmmss')
        return Number(timeA) - Number(timeB)
      })
      return result
    },
  },
  async mounted () {
    const chinesePlatform = ["acfun", "bilibili", "sohu", "youku", "qq", "iqiyi", "letv", "pptv", "mgtv", "dmhy"]
    const res: Bangumi[] = await api.get('https://s1.huangchengtuo.com/json/bangumi.json')
    for (const item of res) {
      // 国内版权
      const hasCopyright = item.sites.some(e => chinesePlatform.includes(e.site))
      if (hasCopyright) {
        // 新增国内开播时间字段
        item.hasCopyright = hasCopyright
        item.chineseBegin = item.sites.find(e => chinesePlatform.includes(e.site)).begin
      }
    }
    this.bangumi = res
  },
  methods: {
    showTitle (item: Bangumi) {
      return item.titleTranslate?.['zh-Hans']?.[0] || item.title
    },
    showSites (arr: Site[]): { title: string, url: string }[] {
      const result = []
      for (const item of arr) {
        if (this.siteMeta[item.site]) {
          const abbr = this.siteMeta[item.site]
          result.push({ title: abbr.title, url: abbr.urlTemplate.replace('{{id}}', item.id) })
        }
      }
      return result
    }
  }
})
</script>

<style lang="scss">
#bangumi {
  padding-bottom: 32px;

  .link + .link {
    margin-left: 5px;
  }
}
</style>
