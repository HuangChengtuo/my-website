declare module '@/static/json/app.json' {
  const arr: string[]
  export default arr
}

interface Site {
  begin: string,
  site: string,
  id: string
}

interface Bangumi {
  begin: string,
  end: string,
  title: string,
  titleTranslate: { 'zh-Hans': string[] },
  sites: Site[],
  hasCopyright: boolean,
  chineseBegin: string,
  now?: boolean
}
