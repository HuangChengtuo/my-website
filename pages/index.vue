<template>
  <div id="home-page">
    <nuxt-link to="/sort-app">sort app</nuxt-link>
    <a-button type="primary">asdasd</a-button>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  async asyncData({$api}) {
    const bitcoin = await $api.get('v1.3.0/article')
    return {bitcoin}
  },
  data() {
    return {
      bitcoin: {}
    }
  }
})
</script>
<style>
#home-page {
  text-align: center;
  margin: 0 auto;
}
</style>