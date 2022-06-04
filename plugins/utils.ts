import dayjs from 'dayjs'

export function formatTime (unix?: number | string | Date, template = 'YYYY-MM-DD HH:mm:ss') {
  return dayjs(unix).format(template)
}

export default defineNuxtPlugin(() => {
  return {
    provide: { formatTime }
  }
})
