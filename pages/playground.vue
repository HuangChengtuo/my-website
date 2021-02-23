<template>
  <div id="playground">
    <a-button @click="head=head.prev">prev</a-button>
    <a-button @click="head=head.next">next</a-button>
    {{ head.val }}
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

class Node {
  val: number
  prev: Node
  next: Node

  constructor(val: number) {
    this.val = val
  }
}

const head = new Node(1)
let tempNext = head

tempNext.next = new Node(2)
tempNext = tempNext.next
let tempPrev = head
tempNext.prev = tempPrev

tempNext.next = new Node(3)
tempNext = tempNext.next
tempPrev = tempPrev.next
tempNext.prev = tempPrev

tempNext.next = new Node(4)
tempNext = tempNext.next
tempPrev = tempPrev.next
tempNext.prev = tempPrev

tempNext.next = new Node(5)
tempNext = tempNext.next
tempPrev = tempPrev.next
tempNext.prev = tempPrev

tempNext.next = head
head.prev = tempNext

export default Vue.extend({
  data() {
    return {
      head
    }
  },
  mounted() {
    console.log(head)
  }
})
</script>
