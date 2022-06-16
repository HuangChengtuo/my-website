export interface Site {
  begin: string,
  site: string,
  id: string
}

export interface Bangumi {
  begin: string,
  end?: string,
  title: string,
  titleTranslate?: { 'zh-Hans': string[] },
  sites?: Site[],
  hasCopyright?: boolean,
  chineseBegin?: string,
  now?: boolean
}
