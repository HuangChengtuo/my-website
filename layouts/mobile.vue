<template>
  <nuxt />
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  head () {
    return {
      link: [{ rel: 'stylesheet', href: 'https://s1.huangchengtuo.com/css/weui.min.css' }]
    }
  }
})
</script>