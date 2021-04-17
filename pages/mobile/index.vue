<template>
  <div id="mobile">
    <img src="https://s1.huangchengtuo.com/img/AF.png" alt="af" class="header" />
    <div class="main">
      <div class="title">黄秤砣的个人网站</div>
      <a href="http://blog.huangchengtuo.com/resume.html">我的简历</a>
      <br />
      <nuxt-link to="/mobile/bangumi">今日新番</nuxt-link>
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
    margin-top: 100vw;
    min-height: 100vh;
    background: #ffffff;
    text-align: center;

    .title {
      text-align: center;
      font-weight: bold;
      color: #000000;
      font-size: 60rem;
      padding: 8rem 0;

      .sub {
        font-size: 40rem;
        font-weight: normal;
      }
    }
  }
}
</style>