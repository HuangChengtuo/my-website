import Vue from 'vue'
import { Plugin } from '@nuxt/types'
import dayjs from "dayjs"

type FormatTime = (unix?: number | string, template?: string) => string
const formatTime: FormatTime = (unix, template = 'YYYY-MM-DD HH:mm:ss') => dayjs(unix).format(template)

const fn: Plugin = (context) => {
  Vue.prototype.$formatTime = formatTime
  context.$formatTime = formatTime
}

interface Utils {
  $formatTime: FormatTime
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
