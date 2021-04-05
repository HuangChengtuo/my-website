<template>
  <div id="error-page">
    <h1>{{error.statusCode}}</h1>
    <h1>{{ error.message }}</h1>
  </div>
</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue'

interface Error {
  message: string,
  path: string,
  statusCode: number
}

export default Vue.extend({
  layout: 'null',
  props: {
    error: Object as PropOptions<Error>
  },
  data() {
    return {
      obj: {
        asd: 16
      }
    }
  },
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