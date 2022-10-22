<template>
  <div id="layout-mobile">
    <slot />
  </div>
</template>

<script setup lang="ts">
useHead({
  link: [{ rel: 'stylesheet', href: 'https://s1.huangchengtuo.com/css/weui.min.css' }]
})
</script>
