import Vue from 'vue'
import { Plugin } from '@nuxt/types'

declare module 'vue/types/vue' {
  interface Vue {
    $axios: any,
    $api: any
  }
}

declare module '@nuxt/types' {
  interface Context {
    $axios: any,
    $api: any
  }
}

const fn: Plugin = (context) => {
  const api = context.$axios.create({ timeout: 10000 })
  api.interceptors.response.use(
    res => {
      if (process.server) {
        console.log('SUCCESS ' + res?.config?.url)
      }
      return res.data
    },
    err => {
      if (process.server) {
        console.error(err?.config?.url)
      }
      return Promise.reject(err)
    }
  )
  Vue.prototype.$api = api
  context.$api = api
}
export default fn

