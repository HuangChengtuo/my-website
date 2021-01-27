declare module "@/static/json/app.json" {
  const temp: string[]
  export default temp
}


interface Bangumi {
  begin: string,
  end: string,
  title: string,
  titleTranslate: { 'zh-Hans': string[] },
  sites: { begin: string, site: string }[],
  hasCopyright: boolean
}

declare module "@/static/json/bangumi.json" {
  const temp: Bangumi[]
  export default temp
}
