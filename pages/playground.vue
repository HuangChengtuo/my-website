<template>
  <div id="playground" style="height: 2000px">
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

interface Demo {
  name: string,
  age: number
}

export default Vue.extend({
  mounted() {
    const data = {
      name: 'hct',
      age: 16,
      sex: 0
    } as Demo
    console.log(data)
  }
})
</script>
