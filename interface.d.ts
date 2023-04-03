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
  /** 前端后加字段 */
  now?: boolean
}
