<template>
  <div id="mobile">
    <img src="https://s1.huangchengtuo.com/img/AF.png" alt="af" class="header" />
    <div class="main">
      width:{{width}}
      <br />
      height:{{height}}
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  layout: 'null',
  data() {
    return {
      width: 0,
      height: 0
    }
  },
  mounted() {
    this.width = document.body.clientWidth
    this.height = document.body.clientHeight
  }
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
    height: 100vh;
    background: #ffffff;
  }
}
</style>