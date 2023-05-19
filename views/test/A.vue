<template>
  <button @click="fn">+1</button>
</template>

<script setup lang="ts">
const props = defineProps<{ modelValue: number }>()
const emits = defineEmits<{
  (e: 'update:modelValue', value: number)
}>()

function fn () {
  emits('update:modelValue', props.modelValue + 1)
}

</script>
