<template>
  <div id="swiper" class="layout-default-body" style="height: 2000px">
    <el-button @click="start">start</el-button>
    <el-button @click="next">next</el-button>
    <el-button @click="stop">stop</el-button>
    <br>
    <div class="sample2">
      <div :class="getClass(1)">1</div>
      <div :class="getClass(2)">2</div>
      <div :class="getClass(3)">3</div>
      <div :class="getClass(4)">4</div>
      <div :class="getClass(5)">5</div>
    </div>
    <br>
    <Sample3 />
    <br>
    <div class="sample1" :style="`background-image:url(${bg[head1.val]})`" />
    <!-- 轮播图提前加载 -->
    <div style="background:url(https://s1.huangchengtuo.com/img/altina.jpg)" />
    <div style="background:url(https://s1.huangchengtuo.com/img/juna.jpg)" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Sample3 from '@/modules/swiper/Sample3.vue'

class Node {
  val: number
  next: Node

  constructor(val: number) {
    this.val = val
  }
}

let temp: Node

const head1 = new Node(1)
temp = head1
temp.next = new Node(2)
temp = temp.next
temp.next = head1

const head2 = new Node(1)
temp = head2
temp.next = new Node(2)
temp = temp.next
temp.next = new Node(3)
temp = temp.next
temp.next = new Node(4)
temp = temp.next
temp.next = new Node(5)
temp = temp.next
temp.next = head2


export default defineComponent({
  components: { Sample3 },
  data() {
    return {
      head1,
      head2,
      timer: null,
      loading: false,
      bg: {
        1: 'https://s1.huangchengtuo.com/img/altina.jpg',
        2: 'https://s1.huangchengtuo.com/img/juna.jpg'
      }
    }
  },
  mounted() {
    this.start()
  },
  methods: {
    start() {
      this.stop()
      this.timer = setInterval(() => {
        this.next()
      }, 4000)
    },
    stop() {
      clearInterval(this.timer)
    },
    next() {
      if (this.loading) {
        return
      }
      this.head1 = this.head1.next
      this.head2 = this.head2.next
      this.loading = true
      setTimeout(() => {
        this.loading = false
      }, 1000)
    },
    getClass(index: number) {
      const ll = this.head2.val === index
      const l = index === this.head2.next.val
      const c = index === this.head2.next.next.val
      const r = index === this.head2.next.next.next.val
      const rr = index === this.head2.next.next.next.next.val
      // 左左，左，中，右，右右
      return { common: true, ll, l, c, r, rr }
    }
  }
})
</script>

<style lang="scss">
#swiper {
  .sample1 {
    height: 675px;
    background-size: cover;
    transition: all 1s;
  }

  .sample2 {
    position: relative;
    height: 200px;
    border: 1px solid #000000;
    overflow: hidden;

    .common {
      opacity: 0;
      background: {
        image: url(https://s1.huangchengtuo.com/img/pureDD.png);
        position: center;
        size: cover;
      }
      transition: all 1s;
      height: 150px;
      width: 150px;
      position: absolute;
      left: 0;
      bottom: 0;
      transform: translateX(-50%);
    }

    .l,
    .c,
    .r {
      opacity: 1;
    }

    .ll {
      left: -10%;
    }

    .l {
      left: 25%;
    }

    .c {
      left: 50%;
      height: 200px;
      width: 200px;
    }

    .r {
      left: 75%;
    }

    .rr {
      left: 110%;
    }
  }
}
</style>
