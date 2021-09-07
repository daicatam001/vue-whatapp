import { createApp } from 'vue'
import App from '@/components/App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import { setupAnt, setupGlobalComponents } from './setup'
import i18n from './i18n'

const app = createApp(App)

setupAnt(app)
setupGlobalComponents(app)

app
  .use(i18n)
  .use(store)
  .use(router)
  .mount('#app')
