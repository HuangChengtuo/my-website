<template>
  <div id="home-page">
    <div class="banner">
    </div>
    <h1 class="title">黄秤砣的小站</h1>
    <div style="background: #000000">a</div>
    <a href="https://alphardex.github.io/gateofbabylon" target="_blank" class="download-btn">copy</a>
    <nuxt-link to="sort-app">go</nuxt-link>
    <div style="height: 2000px">
    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  layout: 'null',
  mounted() {
    window.onmousewheel = (e: any) => {
      console.log(e.wheelDelta > 0 ? 'up' : 'down')
    }
  },
  beforeDestroy() {
    window.onmousewheel = null
  }
})
</script>

<style lang="scss" scoped>
#home-page {
  .banner {
    height: 80vh;

    background: {
      image: url("/img/AF.png");
      attachment: fixed;
      position-x: right;
      position-y: top;
      size: auto 100vw;
    }
  }

  .title {
    line-height: 20vh;
    font-weight: bold;
    text-align: center;
    font-size: 3rem;
  }
}
</style>
