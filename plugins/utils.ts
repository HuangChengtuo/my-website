import Vue from 'vue'
import { Plugin } from '@nuxt/types'
import dayjs from "dayjs"

const formatTime = (unix?: number | string | Date, template = 'YYYY-MM-DD HH:mm:ss') => dayjs(unix).format(template)

const fn: Plugin = (context) => {
  Vue.prototype.$formatTime = formatTime
  context.$formatTime = formatTime
}

interface Utils {
  $formatTime: typeof formatTime
}

declare module 'vue/types/vue' {
  interface Vue extends Utils {
  }
}

declare module '@nuxt/types' {
  interface Context extends Utils {
  }
}

export default fn
