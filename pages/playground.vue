<template>
  <div>
    <h1>playground</h1>
    <button @click="add">{{ $store.state.count }}</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  methods: {
    add () {
      this.$store.commit('changeCount', this.$store.state.count + 1)
    }
  }
})
</script>
