import { defineNuxtConfig } from 'nuxt'

const lifecycle = process.env.npm_lifecycle_event

export default defineNuxtConfig({
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
  build: {
    analyze: true,
    // https://github.com/element-plus/element-plus-nuxt-starter/blob/main/nuxt.config.ts
    transpile: lifecycle === 'build' || lifecycle === 'generate' ? ['element-plus'] : []
  },
  css: ['@/assets/css/default.scss', '@/assets/css/layout.scss'],
  proxy: {
    '/proxy': {
      target: 'https://kankanapi.bihukankan.com',
      pathRewrite: { '^/proxy': '/' }
    }
  }
})
