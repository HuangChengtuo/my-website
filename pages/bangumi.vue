<template>
  <div id="bangumi">
    <a-table :data-source="bangumi" :pagination="false" rowKey="title">
      <a-table-column title="番剧">
        <template slot-scope="row">
          {{ showTitle(row) }}
        </template>
      </a-table-column>
      <a-table-column title="放送时间" align="center">
        <div slot-scope="row" class="number-font">
          {{ $formatTime(row.chineseBegin || row.begin) }}
        </div>
      </a-table-column>
      <a-table-column title="国内放送">
        <template slot-scope="row">
          <a
            v-for="item of showSites(row.sites)"
            :key="item.title"
            :href="item.url"
            target="_blank"
            class="link"
          >{{ item.title }}</a>
        </template>
      </a-table-column>
    </a-table>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

interface Data {
  bangumi: Bangumi[],
  siteMeta: {
    [index: string]: {
      title: string,
      type: string,
      urlTemplate: string
    }
  }
}

export default Vue.extend({
  data(): Data {
    return {
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
  async mounted() {
    const chinesePlatform = ['bilibili', 'acfun', 'qq', 'iqiyi']
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
          console.log(abbr)
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
  .link + .link {
    margin-left: 5px;
  }
}
</style>