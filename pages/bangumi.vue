<template>
  <div id="bangumi">
    <a-tabs v-model="day">
      <a-tab-pane :key="1" tab="周一" />
      <a-tab-pane :key="2" tab="周二" />
      <a-tab-pane :key="3" tab="周三" />
      <a-tab-pane :key="4" tab="周四" />
      <a-tab-pane :key="5" tab="周五" />
      <a-tab-pane :key="6" tab="周六" />
      <a-tab-pane :key="0" tab="周日" />
    </a-tabs>
    <a-table :data-source="showBangumi" :pagination="false" rowKey="title">
      <a-table-column title="番剧">
        <template slot-scope="row">
          {{ showTitle(row) }}
        </template>
      </a-table-column>
      <a-table-column title="放送时间" align="center">
        <div slot-scope="row" class="roboto-font">
          {{ $formatTime(row.chineseBegin || row.begin, 'HH:mm') }}
        </div>
      </a-table-column>
      <a-table-column title="国内放送" width="350px" align="center">
        <template slot-scope="row">
          <a
            v-for="item of showSites(row.sites)"
            :key="item.title"
            :href="item.url"
            target="_blank"
            class="link"
          >{{ item.title }}</a>
          <span v-if="!showSites(row.sites).length" style="color:gainsboro">暂无</span>
        </template>
      </a-table-column>
    </a-table>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import dayjs from 'dayjs'

interface Data {
  day: number,
  bangumi: Bangumi[],
  siteMeta: {
    [key: string]: {
      title: string,
      type: string,
      urlTemplate: string
    }
  }
}

export default Vue.extend({
  data(): Data {
    return {
      day: dayjs().day(),
      bangumi: [],
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
      }
    }
  },
  computed: {
    showBangumi(): Bangumi[] {
      const result = []
      for (const item of this.bangumi) {
        if (dayjs(item.chineseBegin || item.begin).day() === this.day) {
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
  async mounted() {
    const chinesePlatform = ["acfun", "bilibili", "sohu", "youku", "qq", "iqiyi", "letv", "pptv", "mgtv", "dmhy"]
    const res: Bangumi[] = await this.$api.get('https://s1.huangchengtuo.com/json/bangumi.json')
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
    showTitle(item: Bangumi) {
      return item.titleTranslate?.['zh-Hans']?.[0] || item.title
    },
    showSites(arr: Site[]): { title: string, url: string }[] {
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