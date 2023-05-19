<template>
  <div>{{ count }}</div>
  <A v-model="count" />
  <div>{{ visible }}</div>
  <ClientOnly>
    <B v-model="visible" />
  </ClientOnly>
  <button @click="visible = !visible">asdasd</button>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import A from '@/views/test/A.vue'
import B from '@/views/test/B.vue'

const count = ref(0)
const visible = ref(false)

</script>
