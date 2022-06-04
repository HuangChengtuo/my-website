<template>
  <div class="sample3 jcsb">
    <StretchCard :active="index === 1" @mouseenter="index = 1" title="悬浮鼠标" />
    <StretchCard :active="index === 2" @mouseenter="index = 2" title="悬浮鼠标" />
    <StretchCard :active="index === 3" @mouseenter="index = 3" title="悬浮鼠标" />
    <StretchCard :active="index === 4" @mouseenter="index = 4" title="悬浮鼠标" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import StretchCard from './StretchCard.vue'

export default defineComponent({
  components: { StretchCard },
  data() {
    return {
      index: 1
    }
  }
})
</script>

<style scoped>
.sample3 {
  height: 400px;
}
</style>
