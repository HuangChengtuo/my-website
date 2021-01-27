<template>
  <div id="playground" style="height: 2000px">
    <TodayBangumi />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import TodayBangumi from "@/components/index/TodayBangumi.vue";


export default Vue.extend({
  components: { TodayBangumi }
})
</script>
