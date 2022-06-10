<template>
  <LayoutsNav />
  <slot />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import LayoutsNav from '@/views/layouts/Nav.vue'

export default defineComponent({
  components: { LayoutsNav }
})
</script>
