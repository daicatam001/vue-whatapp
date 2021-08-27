import { createApp } from 'vue'
import App from '@/components/App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import 'ant-design-vue/dist/antd.css'
import setupAnt from './setupAnt'
import Avatar from '@/components/ui/Avatar.vue'

const app = createApp(App)

setupAnt(app)

app.component('Avatar', Avatar)

app
  .use(store)
  .use(router)
  .mount('#app')
