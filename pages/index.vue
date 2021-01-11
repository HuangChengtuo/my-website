<template>
  <div id="home-page">
    <nuxt-link to="/sort-app">sort app</nuxt-link>
    <br>
    <a-button type="primary">asdasd</a-button>
    <br>
    {{ now }}
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import dayjs from 'dayjs'

export default Vue.extend({
  async asyncData({ $api }) {
    const bitcoin = await $api.get('v1.3.0/article')
    return { bitcoin }
  },
  data() {
    return {
      bitcoin: {},
      timer: null,
      now: ''
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