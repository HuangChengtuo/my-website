<template>
  <div class="bangumi">
    今日新番
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import bangumi from '@/static/json/bangumi.json'
import dayjs from 'dayjs'

interface Bangumi {
  title: string;
  begin: string;
}

export default Vue.extend({
  data() {
    return { bangumi }
  },
  mounted() {
    const unique = new Set()
    for (const item of this.bangumi) {
      item.sites.map(e => {
        unique.add(e.site)
      })
    }
    console.log(...unique)
  }
})
</script>

<style scoped>

</style>