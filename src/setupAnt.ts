import { Spin, Button, Input, Form, message } from 'ant-design-vue'
import { App } from 'vue'

export default function setupAnt(app: App) {
  app.use(Spin).use(Button).use(Input).use(Form)
  app.config.globalProperties.$message = message
}
