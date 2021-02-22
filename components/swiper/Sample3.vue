<template>
  <div class="sample3 jcsb">
    <StretchCard :active="index === 1" @mouseenter.native="index = 1" title="测试测试" />
    <StretchCard :active="index === 2" @mouseenter.native="index = 2" title="测试测试" />
    <StretchCard :active="index === 3" @mouseenter.native="index = 3" title="测试测试" />
    <StretchCard :active="index === 4" @mouseenter.native="index = 4" title="测试测试" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import StretchCard from './StretchCard.vue'

export default Vue.extend({
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