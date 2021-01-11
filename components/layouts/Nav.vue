<template>
  <div id="nav">
    <nuxt-link to="/" class="logo">
      <img src="/img/DD.png" alt="logo" class="logo-img">
      黄秤砣
    </nuxt-link>
    <span class="time number-font">{{ now }}</span>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import dayjs from 'dayjs'

export default Vue.extend({
  data() {
    return {
      now: dayjs().format('YYYY-MM-DD HH:mm:ss')
    }
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
  margin-bottom: 20px;

  .logo {
    font-size: 20px;
    font-weight: 600;
    color: #2c3e50;
    margin-right: auto;

    .logo-img {
      height: 64px;
    }
  }
}
</style>