import Vue from 'vue'
import { Plugin } from '@nuxt/types'
import dayjs from "dayjs"

type FormatTime = (unix?: number | string, template?: string) => string
const formatTime = (unix, template = 'YYYY-MM-DD HH:mm:ss') => dayjs(unix).format(template)

declare module 'vue/types/vue' {
  interface Vue {
    $formatTime: FormatTime
  }
}

declare module '@nuxt/types' {
  interface Context {
    $formatTime: FormatTime
  }
}

const fn: Plugin = (context) => {
  Vue.prototype.$formatTime = formatTime
  context.$formatTime = formatTime
}
export default fn
