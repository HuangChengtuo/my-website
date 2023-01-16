import dayjs from 'dayjs'
import { defineNuxtPlugin } from '#imports'

export function formatTime (unix?: number | string | Date, template = 'YYYY-MM-DD HH:mm:ss') {
  return dayjs(unix).format(template)
}

// 只在 template 中使用 $，script 直接 import
export default defineNuxtPlugin(() => {
  return {
    provide: { formatTime }
  }
})
