<template functional>
  <a class="card" :href="props.href">
    <div class="card-title">{{props.title}}</div>
    <img :src="props.src" alt="DD" class="dd" />
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
