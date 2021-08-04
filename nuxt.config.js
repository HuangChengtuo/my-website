export default {
  axios: {
    proxy: true,
    prefix: '/proxy'
  },
  // srr 用
  // build: { publicPath: 'https://my-website-1302789012.cos.ap-shanghai.myqcloud.com' },
  buildModules: ['@nuxt/typescript-build'],
  // 自动注册全局组件，需要声明相应文件夹，没有声明的仍需 import 引入
  components: true,
  css: ['@/static/css/index.scss'],
  generate: { subFolders: false },
  head: {
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://s1.huangchengtuo.com/css/element.css' }
    ],
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' }
    ],
    title: '黄秤砣的网站'
  },
  modules: ['@nuxtjs/axios'],
  plugins: ['@/plugins/api.ts', '@/plugins/element.ts', '@/plugins/utils.ts'],
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
}
