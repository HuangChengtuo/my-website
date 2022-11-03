import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  app: {
    head: {
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.png' },
        { rel: 'stylesheet', href: 'https://s1.huangchengtuo.com/css/element3.css' }
      ],
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' }
      ],
      title: '黄秤砣的网站'
    },
  },
  build: { analyze: true },
  css: ['@/assets/css/default.scss'],
  proxy: {
    '/proxy': {
      target: 'https://kankanapi.bihukankan.com',
      pathRewrite: { '^/proxy': '/' }
    }
  }
})
