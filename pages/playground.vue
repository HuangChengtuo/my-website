<template>
  <div id="playground" style="height: 2000px">
    {{ time }}
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  async asyncData({ $formatTime }) {
    return { time: $formatTime() }
  }
})
</script>
