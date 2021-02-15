<template>
  <div>
    <a-table :data-source="bangumi" :pagination="false">
      <a-table-column title="番剧" dataIndex="title" />
      <a-table-column title="放送时间">
        <div slot-scope="row" class="number-font">
          {{ $formatTime(row.chineseBegin || row.begin) }}
        </div>
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
  async asyncData({ $api }) {
    const chinesePlatform = ['bilibili', 'acfun', 'qq', 'iqiyi']
    const bangumi: Bangumi[] = await $api.get('https://s1.huangchengtuo.com/json/bangumi.json')
    for (const item of bangumi) {
      // 国内版权
      const hasCopyright = item.sites.some(e => chinesePlatform.includes(e.site))
      if (hasCopyright) {
        // 新增国内开播时间字段
        item.hasCopyright = hasCopyright
        item.chineseBegin = item.sites.find(e => chinesePlatform.includes(e.site)).begin
      }
    }
    return { bangumi }
  },
  data(): Data {
    return {
      bangumi: [],
      siteMeta: {}
    }
  },
  mounted() {
    this.$api.get('https://cdn.jsdelivr.net/npm/bangumi-data@0.3/dist/data.json').then(res => {
      this.siteMeta = res.siteMeta
      console.log(this.siteMeta)
    })
  },
  methods: {
    log(item) {
      console.log(item)
    },
    showTitle(item: Bangumi) {
      return item.titleTranslate?.['zh-Hans']?.[0] || item.title
    }
  }
})
</script>

<style scoped>

</style>