export default {
  server: {
    port: 80,
    host: '0.0.0.0'
  },
  buildModules: ['@nuxt/typescript-build'],
  modules: ['@nuxtjs/axios'],
  axios: {
    proxy: true,
    baseURL: 'https://kankanapi.bihukankan.com',
    browserBaseURL: '/proxy'
  },
  proxy: {
    '/proxy': {
      target: 'https://kankanapi.bihukankan.com',
      pathRewrite: { '^/proxy': '/' }
    }
  },
  plugins: ['@/plugins/api.ts', '@/plugins/antd.ts'],
  css: ['@/static/styles/index.scss'],
  head: {
    title: '黄秤砣的主页',
    meta: [{ charset: 'utf-8' }]
  }
}