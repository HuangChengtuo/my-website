<template>
  <div id="mobile">
    <img src="https://s1.huangchengtuo.com/img/AF.png" alt="af" class="header">
    <div class="main">
      <h2 class="weui-form__title">黄秤砣的个人网站</h2>
      <a href="https://blog.huangchengtuo.com/resume.html" class="weui-btn weui-btn_primary">我的简历</a>
      <NuxtLink to="/mobile/bangumi" class="weui-btn weui-btn_primary">今日新番</NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { definePageMeta } from '#imports'

definePageMeta({ layout: 'mobile' })
</script>

<style lang="scss">
#mobile {
  .header {
    width: 100vw;
    height: 100vw;
    object-fit: cover;
    position: fixed;
    top: 0;
    left: 0;
    z-index: -1;
  }

  .main {
    margin-top: 100vw;
    min-height: 100vh;
    background: #ffffff;
    padding-top: 24rem;

    .weui-form__title {
      margin-bottom: 32rem;
    }
  }
}
</style>
