<template>
  <div>
    playground
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  created() {
    console.log('created')
    this.$api.get('https://s1.huangchengtuo.com/json/bangumi.json').then(() => {
      console.log(this.$formatTime())
    })
  }
})
</script>