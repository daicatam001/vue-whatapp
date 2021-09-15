import {
  Spin,
  Button,
  Input,
  Form,
  message,
  Dropdown,
  Menu,
  Drawer,
  Progress,
  Radio,
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
  DoubleCheck,
  SendState,
  Time,
  Spinner,
  Close,
  UserCard,
  TailOut,
  TailIn,
  ChevronRight,
  MessageMeta,
  Ban,
  Lock,
  ThumbDown,
  PhoneCircle,
  OnlineState,
  PanelTitle,
  Trash,
  PhoneBookCard,
  HeadingCard,
  UserTag,
  ArrowForward,
  ChatCard
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
    .use(Radio)
    .use(Drawer)
    .use(Progress)
  app.config.globalProperties.$message = message
  app.config.globalProperties.$notification = notification
}

// Globla components
export function setupGlobalComponents(app: App): void {
  app.component('Avatar', Avatar)
  app.component('SendState', SendState)
  app.component('MessageMeta', MessageMeta)
  app.component('UserCard', UserCard)
  app.component('OnlineState', OnlineState)
  app.component('PanelTitle', PanelTitle)
  app.component('ChatCard', ChatCard)
  app.component('HeadingCard', HeadingCard)
  app.component('PhoneBookCard', PhoneBookCard)
  app.component('UserTag', UserTag)

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
  app.component('Time', Time)
  app.component('Spinner', Spinner)
  app.component('Close', Close)
  app.component('TailOut', TailOut)
  app.component('TailIn', TailIn)
  app.component('ChevronRight', ChevronRight)
  app.component('Ban', Ban)
  app.component('ThumbDown', ThumbDown)
  app.component('Trash', Trash)
  app.component('PhoneCircle', PhoneCircle)
  app.component('Lock', Lock)
  app.component('ArrowForward', ArrowForward)
}
