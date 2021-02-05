<template functional>
  <a class="card" href="http://blog.huangchengtuo.com">
    <div class="card-title">我的博客</div>
    <img src="https://s1.huangchengtuo.com/img/DD.png" alt="DD" class="dd" />
  </a>
</template>

<style lang="scss" scoped>
.card {
  position: relative;

  .dd {
    width: 300px;
    position: absolute;
    top: calc(50% + 20px);
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>