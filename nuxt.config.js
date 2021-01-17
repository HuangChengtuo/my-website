export default {
  axios: {
    proxy: true,
    baseURL: 'https://kankanapi.bihukankan.com',
    browserBaseURL: '/proxy'
  },
  buildModules: ['@nuxt/typescript-build'],
  components: {
    dirs: [
      {
        path: '~/components/layouts/',
        prefix: 'Layouts'
      }
    ]
  },
  css: ['@/static/styles/index.scss'],
  head: {
    title: '黄秤砣的主页',
    meta: [{ charset: 'utf-8' }]
  },
  modules: ['@nuxtjs/axios'],
  plugins: ['@/plugins/api.ts', '@/plugins/antd.ts'],
  proxy: {
    '/proxy': {
      target: 'https://kankanapi.bihukankan.com',
      pathRewrite: { '^/proxy': '/' }
    }
  },
  server: {
    port: 80,
    host: '0.0.0.0'
  }
}