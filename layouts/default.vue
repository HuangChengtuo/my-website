<template>
  <div id="layout-default">
    <LayoutNav />
    <nuxt class="nuxt-body" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import LayoutNav from '@/components/layouts/Nav.vue'

export default Vue.extend({
  components: { LayoutNav }
})
</script>

<style lang="scss" scoped>
#layout-default {
  .nuxt-body {
    width: 1200px;
    margin: 0 auto;
  }
}
</style>