<template>
  <div id="error-page">
    <h1>{{ error.statusCode }}</h1>
    <h1>{{ error.message }}</h1>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  layout: 'null',
  props: { error: Object },
  mounted() {
    console.log(this.error.message)
  }
})
</script>

<style lang="scss" scoped>
#error-page {
  padding-top: 200px;
  text-align: center;
}
</style>
