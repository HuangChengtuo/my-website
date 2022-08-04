<template>
  <div id="ct-page">
    <!-- <template v-for="item of 399">
      <img v-show="item - 1 === id" :key="item" style="width:100vw" :src="`https://s1.huangchengtuo.com/img/ct/${'1652326155109' + item - 1}.JPG`" />
    </template> -->
    <div
      class="img"
      :style="`background-position:-${100 * (id % 100)}vw 0;background-image:url(https://s1.huangchengtuo.com/img/ct/${getBg()}.jpg)`"
    />
    <img v-show="false" src="https://s1.huangchengtuo.com/img/ct/1.jpg" />
    <img v-show="false" src="https://s1.huangchengtuo.com/img/ct/2.jpg" />
    <img v-show="false" src="https://s1.huangchengtuo.com/img/ct/3.jpg" />
    <img v-show="false" src="https://s1.huangchengtuo.com/img/ct/4.jpg" />
    <el-slider style="margin:256rem 64rem" v-model="id" :show-tooltip="false" :min="0" :max="398" />
  </div>
</template>

<script>
export default {
  layout: 'null',
  data() {
    return {
      id: 0
    }
  },
  methods: {
    getBg() {
      return Math.floor(this.id / 100) + 1
    }
  }
}
</script>

<style lang="scss">
#ct-page {
  .img {
    background: {
      image: url("https://s1.huangchengtuo.com/img/ct/1.jpg");
      size: cover;
    }
    width: 100vw;
    height: 100vw;
  }
}
</style>
