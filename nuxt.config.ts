import { defineNuxtConfig } from 'nuxt'

export default defineNuxtConfig({
  build: { analyze: true },
  css: ['@/static/css/index.scss'],
  app: {
    head: {
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'stylesheet', href: 'https://s1.huangchengtuo.com/css/element3.css' }
      ],
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' }
      ],
      title: '黄秤砣的网站'
    },
  },
  proxy: {
    '/proxy': {
      target: 'https://kankanapi.bihukankan.com',
      pathRewrite: { '^/proxy': '/' }
    }
  },
  server: {
    port: 1111,
    host: '0.0.0.0'
  }
})
