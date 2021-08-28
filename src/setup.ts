import {
  Spin,
  Button,
  Input,
  Form,
  message,
  Dropdown,
  Menu
} from 'ant-design-vue'
import { App } from 'vue'
import { Avatar, ThreeDotVertical } from '@/components/ui'

// Ant components
export function setupAnt(app: App): void {
  app
    .use(Spin)
    .use(Button)
    .use(Input)
    .use(Dropdown)
    .use(Form)
    .use(Menu)
  app.config.globalProperties.$message = message
}

// Globla components
export function setupGlobalComponents(app: App): void {
  app.component('Avatar', Avatar)

  // icons
  app.component('ThreeDotVertical', ThreeDotVertical)
}
