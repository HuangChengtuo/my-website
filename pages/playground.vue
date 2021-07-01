<template>
  <div>
    <h1>playground</h1>
    <button @click="add">{{ $store.state.count }}</button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  methods: {
    add () {
      this.$store.commit('changeCount', this.$store.state.count + 1)
    }
  }
})
</script>
