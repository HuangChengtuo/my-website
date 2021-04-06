<template>
  <div id="mobile">
    <img src="https://s1.huangchengtuo.com/img/AF.png" alt="af" class="header" />
    <div class="main">
      <div class="title">黄秤砣的个人网站</div>
      <a href="http://blog.huangchengtuo.com">个人博客</a>
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
html {
  // 375px除以100等于100vw除以font-size，得到font-size等于26.6666666vw
  // 375px除以100等于1(100%)除以font-size，得到font-size等于.266666666vw
  font-size: 0.26666666666vw;
}

body {
  font-size: 20rem;
}

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
      font-size: 30rem;
      padding: 8rem 0;

      .sub {
        font-size: 20rem;
        font-weight: normal;
      }
    }
  }
}
</style>