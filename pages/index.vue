<template>
  <div id="home-page">
    <nuxt-link to="/sort-app">sort app</nuxt-link>
    <br>
    <a-button type="primary">asdasd</a-button>
    <br>
    {{ now }}
    <br>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import dayjs from 'dayjs'

export default Vue.extend({
  async asyncData({ $api }) {
    const articles = await $api.get('v1.3.0/article')
    return { articles }
  },
  data() {
    return {
      now: dayjs().format('YYYY-MM-DD HH:mm:ss'),
      timer: null
    }
  },
  created() {

    this.timer = setInterval(() => {
      this.now = dayjs().format('YYYY-MM-DD HH:mm:ss')
    }, 1000)
  },
  beforeDestroy() {
    clearInterval(this.timer)
  }
})
</script>
<style>
#home-page {
  text-align: center;
  margin: 0 auto;
}
</style>