import qs from 'qs'
import type { Bangumi } from '@/interface'

export function get<T = unknown> (url: string, params?: unknown): Promise<T> {
  let query = ''
  if (params) {
    query = '?' + qs.stringify(params)
  }
  return fetch(url + query).then(res => res.json())
}

export default {
  getBangumi () {
    return get<Bangumi[]>('https://s1.huangchengtuo.com/json/bangumi.json')
  }
}
