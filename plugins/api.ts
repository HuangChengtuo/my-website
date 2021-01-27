import Vue from 'vue'
import { Plugin } from '@nuxt/types'

const fn: Plugin = (context) => {
  const api = context.$axios.create({ timeout: 10000 })
  api.interceptors.response.use(
    (res: any) => res.data,
    (err: any) => Promise.reject(err)
  )
  Vue.prototype.$api = api
  context.$api = api
}
export default fn

