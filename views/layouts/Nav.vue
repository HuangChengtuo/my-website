<template>
  <div id="nav">
    <NuxtLink to="/" class="logo">
      <img src="https://s1.huangchengtuo.com/img/pureDD.png" alt="logo" class="logo-img">
      黄秤砣
    </NuxtLink>
    <span class="time roboto-font">{{ now }}</span>
    <a href="https://react.huangchengtuo.com" class="download-btn">工具箱</a>
    <a href="https://blog.huangchengtuo.com" class="download-btn">去博客</a>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { formatTime } from '@/utils'

const now = ref('')

let timer: NodeJS.Timer = null

onMounted(() => {
  timer = setInterval(() => {
    now.value = formatTime()
  }, 1000)
})

onBeforeUnmount(() => {
  clearInterval(timer)
})

</script>

<style lang="scss" scoped>
#nav {
  display: flex;
  align-items: center;
  background: #ffffff;
  height: 64px;
  box-shadow: 0 4px 8px rgba(234, 235, 246, .25);
  padding: 0 20px;

  .logo {
    font-size: 20px;
    font-weight: 600;
    color: #2c3e50;
    margin-right: auto;

    .logo-img {
      height: 64px;
    }
  }

  .download-btn {
    color: #ffffff;
    cursor: pointer;
    width: 80px;
    height: 36px;
    line-height: 36px;
    text-align: center;
    background: #fb7299;
    border-radius: 4px;
    margin-left: 14px;
  }
}
</style>
