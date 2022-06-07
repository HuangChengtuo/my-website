<template>
  <div id="sort-app">
    <h1>
      <input v-model="text" @keyup.enter="add" />
      <button @click="add">add</button>
    </h1>
    <div v-for="(item,index) of arr" :key="item" :class="index === lately ? 'red' : ''">{{ item }}</div>
    <h2>count:{{ arr.length }}</h2>
    <div style="height:1000px"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import arr from '@/public/json/app.json'

export default defineComponent({
  data() {
    return {
      text: '',
      lately: 12,
      arr
    }
  },
  mounted() {
    console.log(arr.length)
  },
  methods: {
    add() {
      if (!this.text) {
        return
      }
      this.arr.push(this.text)
      this.arr.sort()
      this.lately = this.arr.indexOf(this.text)
    }
  }
})
</script>
<style lang="scss">
#sort-app {
  text-align: center;
  margin: 0 auto;

  .red {
    color: red;
    font-weight: bold;
  }
}
</style>
