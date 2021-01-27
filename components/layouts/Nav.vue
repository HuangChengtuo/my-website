<template>
  <div id="nav">
    <nuxt-link to="/" class="logo">
      <img src="/img/DD.png" alt="logo" class="logo-img">
      黄秤砣
    </nuxt-link>
    <span class="time number-font">{{ now }}</span>
    <a href="/黄诚拓前端简历.pdf" target="_blank" class="download-btn">简历</a>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  data() {
    return {
      now: this.$formatTime(),
      timer: null
    }
  },
  mounted() {
    this.timer = setInterval(() => {
      this.now = this.$formatTime()
    }, 1000)
  },
  beforeDestroy() {
    clearInterval(this.timer)
  }
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
    width: 100px;
    height: 36px;
    line-height: 36px;
    text-align: center;
    background: #fb7299;
    border-radius: 4px;
    margin-left: 14px;
  }
}
</style>