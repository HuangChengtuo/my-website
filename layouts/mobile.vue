<template>
  <slot />
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  head () {
    return {
      link: [{ rel: 'stylesheet', href: 'https://s1.huangchengtuo.com/css/weui.min.css' }]
    }
  }
})
</script>
