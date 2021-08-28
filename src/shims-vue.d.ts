import { Store } from '@/store';// path to store file
import { message ,notification} from 'ant-design-vue'

/* eslint-disable */
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $store: Store;
    $message:message,
    $notification:notification,
    $refs:any
  }
}
