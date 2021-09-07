import { createApp } from 'vue'
import App from '@/components/App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import 'ant-design-vue/dist/antd.less'
import {setupAnt, setupGlobalComponents} from './setup'

const app = createApp(App)

setupAnt(app)
setupGlobalComponents(app)

app
  .use(store)
  .use(router)
  .mount('#app')

