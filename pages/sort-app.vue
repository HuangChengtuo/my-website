<template>
  <div id="sort-app">
    <h1>
      <input v-model="text" @keyup.enter="add" />
      <button @click="add">add</button>
    </h1>
    <div v-for="(item,index) of arr" :class="index === lately ? 'red' : ''">{{ item }}</div>
    <h2>count:{{ arr.length }}</h2>
  </div>
</template>
<script>
export default {
  data() {
    return {
      text: '',
      lately: 0,
      arr: ["baidutieba", "bianqian", "bilibili", "dingding", "fuwuyufankui", "gaode", "head", "jingdong", "jisuanqi", "kendeji", "lianxiren", "liulanqi", "luyinji", "mijia", "minri", "pinduo", "pinmu", "play", "qq", "quanqiu", "rili", "saoyisao", "shizhong", "shoujiguanjia", "shoujitao", "ssrr", "tianqi", "wangyiyun", "wanneng", "weibo", "weixin", "wenjian", "wps", "xiangce", "xiaoai", "xiaomiqianbao", "xiaomishangcheng", "xiaomishipin", "xiaomiyundong", "xiazai", "yinyong", "yinyue", "zhifubao", "zhihu", "zhinanzhen", "zhutibizhi"]
    }
  },
  methods: {
    add() {
      if (!this.text) {
        return
      }
      this.arr.push(this.text)
      this.arr.sort()
      this.lately = this.arr.indexOf(this.text)
      console.log(JSON.stringify(this.arr))
      this.text = ''
    }
  }
}
</script>
<style>
#sort-app {
  text-align: center;
  margin: 0 auto;
}

#sort-app .red {
  color: red;
  font-weight: bold;
}
</style>