import { Store } from '@/store';// path to store file
import { NotificationApi,MessageApi} from 'ant-design-vue'

/* eslint-disable */
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $store: Store;
    $message:MessageApi,
    $notification:NotificationApi,
    $refs:any
  }
}
