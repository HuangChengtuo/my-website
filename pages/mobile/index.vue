<template>
  <div id="mobile">
    <img src="https://s1.huangchengtuo.com/img/AF.png" alt="af" class="header" />
    <div class="main">
      <div class="title">黄秤砣的个人网站</div>
      <a href="http://blog.huangchengtuo.com/resume.html" class="link">我的简历</a>
      <nuxt-link to="/mobile/bangumi" class="link">今日新番</nuxt-link>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  layout: 'null'
})
</script>

<style lang="scss">
#mobile {
  .header {
    width: 100vw;
    height: 100vw;
    object-fit: cover;
    position: fixed;
    top: 0;
    z-index: -1;
  }

  .main {
    margin-top: 90vw;
    min-height: 100vh;
    background: #ffffff;
    text-align: center;
    border-radius: 66rem;
    padding-top: 24rem;

    .title {
      text-align: center;
      font-weight: bold;
      color: #000000;
      font-size: 60rem;
      padding: 8rem 0;
    }

    .link {
      display: block;
      margin: 24rem 0;
    }
  }
}
</style>