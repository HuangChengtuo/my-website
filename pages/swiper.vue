<template>
  <div id="swiper" style="height: 2000px">
    <a-button @click="start">start</a-button>
    <a-button @click="end">end</a-button>
    <br />
    <div class="sample1" :style="`background-image:url(https://s6.bihukankan.com/img/0205index/banner${head1.val}.png)`">{{ head1.val }}</div>
    <!--提前加载，防止白屏-->
    <div style="background-image: url(https://s6.bihukankan.com/img/0205index/banner1.png)"></div>
    <div style="background-image: url(https://s6.bihukankan.com/img/0205index/banner2.png)"></div>
    <div style="background-image: url(https://s6.bihukankan.com/img/0205index/banner3.png)"></div>
    <a-button @click="next">next</a-button>
    <div class="sample2">
      <div :class="getClass(1)">1</div>
      <div :class="getClass(2)">2</div>
      <div :class="getClass(3)">3</div>
      <div :class="getClass(4)">4</div>
      <div :class="getClass(5)">5</div>
    </div>
    <Sample3 />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Sample3 from '@/components/swiper/Sample3.vue'

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
temp.next = new Node(3)
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


export default Vue.extend({
  components: { Sample3 },
  data() {
    return {
      head1,
      head2,
      timer: null,
      loading: false
    }
  },
  mounted() {
    this.start()
  },
  methods: {
    start() {
      this.end()
      this.timer = setInterval(() => {
        this.next()
      }, 4000)
    },
    end() {
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
    height: 500px;
    background: {
      size: cover;
      position: bottom;
    }
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
        image: url(https://s1.huangchengtuo.com/img/ywwuyi.jpg);
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