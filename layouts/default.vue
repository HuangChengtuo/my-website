<template>
  <div id="layout-default">
    <LayoutsNav />
    <nuxt class="nuxt-body" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import LayoutsNav from '@/components/layouts/Nav.vue'

export default Vue.extend({
  components: { LayoutsNav }
})
</script>

<style lang="scss" scoped>
#layout-default {
  .nuxt-body {
    width: 1200px;
    margin: 16px auto;
  }
}
</style>