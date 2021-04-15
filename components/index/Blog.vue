<template functional>
  <a class="card" href="http://blog.huangchengtuo.com/resume.html">
    <div class="card-title">我的简历</div>
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