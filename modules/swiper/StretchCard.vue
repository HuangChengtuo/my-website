<template>
  <div class="stretch-card" :class="{'stretch-card-active':active}">
    <h1 class="title">{{ title }}</h1>
  </div>
</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue'

export default Vue.extend({
  props: {
    active: Boolean as PropOptions<boolean>,
    title: String as PropOptions<string>
  }
})

</script>

<style lang="scss" scoped>
.stretch-card {
  height: 400px;
  width: 180px;
  border-radius: 14px;
  background: {
    image: url(https://s1.huangchengtuo.com/img/banner.jpg);
    size: cover;
    position: center;
  };
  transition: all .5s;

  .title {
    opacity: 0;
    color: #ffffff;
    padding: 16px;
    transition: all .5s;
  }

  &-active {
    width: 550px;

    .title {
      opacity: 1;
    }
  }
}
</style>
