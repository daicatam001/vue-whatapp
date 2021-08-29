import {
  Spin,
  Button,
  Input,
  Form,
  message,
  Dropdown,
  Menu,
  Drawer,
  notification
} from 'ant-design-vue'
import { App } from 'vue'
import {
  Avatar,
  ThreeDotVertical,
  BackArrow,
  Camera,
  Pencil,
  Checkmark,
  Computer
} from '@/components/ui'

// Ant components
export function setupAnt(app: App): void {
  app
    .use(Spin)
    .use(Button)
    .use(Input)
    .use(Dropdown)
    .use(Form)
    .use(Menu)
    .use(Drawer)
  app.config.globalProperties.$message = message
  app.config.globalProperties.$notification = notification
}

// Globla components
export function setupGlobalComponents(app: App): void {
  app.component('Avatar', Avatar)

  // icons
  app.component('ThreeDotVertical', ThreeDotVertical)
  app.component('BackArrow', BackArrow)
  app.component('Camera', Camera)
  app.component('Pencil', Pencil)
  app.component('Checkmark', Checkmark)
  app.component('Computer', Computer)
}
