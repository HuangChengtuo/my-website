<template>
  <div id="playground" style="height: 2000px">
    {{ time }}
    <div class="banner">{{head.val}}</div>
    <a-button @click="start">start</a-button>
    <a-button @click="end">end</a-button>
    <div class="swiper">
      <div class="common" :class="getClass(1)">1</div>
      <div class="common" :class="getClass(2)">2</div>
      <div class="common" :class="getClass(3)">3</div>
      <div class="common" :class="getClass(4)">4</div>
      <div class="common" :class="getClass(5)">5</div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

class ListNode {
  val: number
  next: ListNode
  constructor(val: number) {
    this.val = val
  }
}

const head = new ListNode(1)

let temp = head
temp.next = new ListNode(2)
temp = temp.next
temp.next = new ListNode(3)
temp = temp.next
temp.next = new ListNode(4)
temp = temp.next
temp.next = new ListNode(5)
temp = temp.next
temp.next = head


export default Vue.extend({
  async asyncData() {
    return { time: new Date().toString() }
  },
  data() {
    return {
      time: '',
      head,
      timer: null
    }
  },
  mounted() {
    this.start()
  },
  methods: {
    start() {
      this.end()
      this.timer = setInterval(() => {
        this.head = this.head.next
      }, 5000)
    },
    end() {
      clearInterval(this.timer)
    },
    getClass(index: number) {
      const ll = this.head.val === index
      const l = index === this.head.next.val
      const c = index === this.head.next.next.val
      const r = index === this.head.next.next.next.val
      const rr = index === this.head.next.next.next.next.val
      // 左左，左，中，右，右右
      return { ll, l, c, r, rr }
    }
  }
})
</script>

<style lang="scss">
#playground {
  .banner {
    height: 500px;
    background: {
      size: cover;
      position: bottom;
    }
    transition: all 0.5s;
  }

  .swiper {
    position: relative;
    height: 400px;
    border: 1px solid #000000;
    overflow: hidden;

    .common {
      opacity: 0;
      background: {
        image: url(https://s6.bihukankan.com/common/default.png);
        position: center;
        size: cover;
      }
      transition: all 1s;
      height: 350px;
      width: 200px;
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
      height: 400px;
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