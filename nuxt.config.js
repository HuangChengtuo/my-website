export default {
  axios: {
    proxy: true,
    baseURL: 'https://kankanapi.bihukankan.com',
    browserBaseURL: '/proxy'
  },
  buildModules: ['@nuxt/typescript-build'],
  // 自动注册全局组件，需要声明相应文件夹，没有声明的仍需 import 引入
  components: {
    dirs: [{
      path: '~/components/global/',
      prefix: ''
    }]
  },
  css: ['@/static/styles/index.scss'],
  head: {
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      // antd.css 太大，改 link
      { rel: 'stylesheet', href: '/styles/antd.min.css' }
    ],
    meta: [{ charset: 'utf-8' }],
    title: '黄秤砣'
  },
  modules: ['@nuxtjs/axios'],
  plugins: ['@/plugins/api.ts', '@/plugins/antd.ts', '@/plugins/utils.ts'],
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