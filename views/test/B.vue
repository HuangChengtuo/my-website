<template>
  <ElDialog :modelValue="props.modelValue" @update:modelValue="value=>{emits('update:modelValue',value)}">asdasd</ElDialog>
</template>

<script setup lang="ts">
import { ElDialog } from 'element-plus'

const props = defineProps<{ modelValue: boolean }>()
const emits = defineEmits<{
  (e: 'update:modelValue', value: boolean)
}>()
</script>
