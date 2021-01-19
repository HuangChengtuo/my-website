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
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      // antd.css 太大，改 link
      { rel: 'stylesheet', href: '/styles/antd.css' }
    ],
    meta: [{ charset: 'utf-8' }],
    title: '黄秤砣的主页'
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