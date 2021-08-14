import {createApp} from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import "ant-design-vue/dist/antd.css";
import setupAnt from './setupAnt'

const app = createApp(App)

setupAnt(app)
app.use(store).use(router).mount('#app')