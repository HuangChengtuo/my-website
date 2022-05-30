<template>
  <div id="layout-default">
    <LayoutsNav />
    <slot class="nuxt-body" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import LayoutsNav from '@/modules/layouts/Nav.vue'

export default defineComponent({
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
