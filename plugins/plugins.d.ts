type FormatTime = (unix: number | string, template: string) => string
// 不 export 点什么会被识别为全局脚本，覆盖默认 d.ts https://blog.csdn.net/HermitSun/article/details/104104762
export { FormatTime }

declare module 'vue/types/vue' {
  interface Vue {
    $api: any,
    $formatTime: FormatTime
  }
}

declare module '@nuxt/types' {
  interface Context {
    $axios: any,
    $api: any,
    $formatTime: FormatTime
  }
}