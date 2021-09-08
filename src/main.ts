import { createApp } from 'vue'
import App from '@/components/App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import './theme/theme.less'
import { setupAnt, setupGlobalComponents } from './core/setup'
import i18n from './core/i18n'

const app = createApp(App)

setupAnt(app)
setupGlobalComponents(app)

app
  .use(i18n)
  .use(store)
  .use(router)
  .mount('#app')
