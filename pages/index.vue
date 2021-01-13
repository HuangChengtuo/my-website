<template>
  <div id="home-page">
    <LayoutNav />
    <img src="/img/banner.jpg" alt="juna" class="banner">
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import LayoutNav from '@/components/layouts/Nav.vue'

export default Vue.extend({
  layout: 'index',
  components: { LayoutNav }
})
</script>

<style lang="scss" scoped>
#home-page {
  .banner {
    width: 100%;
    height: 250px;
    object-fit: cover;
    object-position: right;
  }
}
</style>
