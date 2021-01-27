import Vue from 'vue'
import { Plugin } from '@nuxt/types'
import dayjs from "dayjs"
import { FormatTime } from './plugins'

const formatTime: FormatTime = (unix, template = 'YYYY-MM-DD HH:mm:ss') => dayjs(unix).format(template)

const fn: Plugin = (context) => {
  Vue.prototype.$formatTime = formatTime
  context.$formatTime = formatTime
}
export default fn
