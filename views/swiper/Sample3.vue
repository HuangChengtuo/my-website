<template>
  <div class="sample3 jcsb">
    <StretchCard :active="index === 1" title="悬浮鼠标" @mouseenter="index = 1" />
    <StretchCard :active="index === 2" title="悬浮鼠标" @mouseenter="index = 2" />
    <StretchCard :active="index === 3" title="悬浮鼠标" @mouseenter="index = 3" />
    <StretchCard :active="index === 4" title="悬浮鼠标" @mouseenter="index = 4" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import StretchCard from './StretchCard.vue'

const index = ref(1)
</script>

<style scoped>
.sample3 {
  height: 400px;
}
</style>
