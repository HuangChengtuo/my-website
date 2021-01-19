<template>
  <div id="playground">
    {{ fps }}
    <a-button @click="animate">test</a-button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  data() {
    return {
      fps: 0
    }
  },
  mounted() {
    this.animate()
  },
  methods: {
    animate() {
      let start = 0
      this.fps = 0
      const step = (unix: number) => {
        if (!start) {
          start = unix
        }
        const duration = unix - start
        this.fps++
        if (duration < 1000) {
          requestAnimationFrame(step)
        }
      }
      requestAnimationFrame(step)
    }
  }
})
</script>
