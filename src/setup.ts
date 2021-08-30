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
  Search,
  ThreeDotVertical,
  ArrowBack,
  Camera,
  Pencil,
  Checkmark,
  Computer,
  ChevronDown,
  DoubleCheck
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
  app.component('ArrowBack', ArrowBack)
  app.component('Camera', Camera)
  app.component('Pencil', Pencil)
  app.component('Checkmark', Checkmark)
  app.component('Computer', Computer)
  app.component('Search', Search)
  app.component('ChevronDown', ChevronDown)
  app.component('DoubleCheck', DoubleCheck)
}
