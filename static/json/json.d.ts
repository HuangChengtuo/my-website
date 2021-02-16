declare module "@/static/json/app.json" {
  const temp: string[]
  export default temp
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
  chineseBegin: string
}
