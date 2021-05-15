<template>
  <nuxt />
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  head() {
    console.log('layout head')
    return {
      // weui 替换 antd
      link: [{ hid: 'antd', rel: 'stylesheet', href: 'https://s1.huangchengtuo.com/css/weui.min.css' }]
    }
  }
})
</script>