<template>
  <div id="error-page">
    <h1>{{ error.statusCode }}</h1>
    <h1>{{ error.message }}</h1>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'

interface Err {
  data: string,
  description: string,
  message: string,
  statusCode: string,
  statusMessage: string,
  url: string
}

const props = defineProps<{ error: Err }>()

onMounted(() => {
  console.log(props.error)
})
</script>

<style lang="scss">
#error-page {
  padding-top: 200px;
  text-align: center;
}
</style>
