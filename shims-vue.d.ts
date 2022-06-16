import { formatTime } from '@/plugins/utils'

declare module '*.vue' {
  export default Vue
}

declare module '@vue/runtime-core' {
  export interface ComponentCustomProperties {
    $formatTime: typeof formatTime
  }
}
