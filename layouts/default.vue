<template>
  <div id="layout-default">
    <LayoutsNav />
    <div id="layout-default-body">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import LayoutsNav from '@/views/layouts/Nav.vue'
</script>

<style lang="scss">
#layout-default {
  #layout-default-body {
    width: 1200px;
    margin: 16px auto;
  }
}
</style>
