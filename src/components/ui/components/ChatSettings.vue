<template>
  <a-menu class="menu-settings-dropdown chat-settings">
    <a-menu-item @click="storeChat"> {{ $t('storeChat') }} </a-menu-item>
    <a-menu-item @click="offNotify">
      {{ $t('offNotification') }}
    </a-menu-item>
    <a-menu-item @click="deleteChat"> {{ $t('deleteChat') }} </a-menu-item>
    <a-menu-item @click="pinChat"> {{ $t('pinChat') }} </a-menu-item>
    <a-menu-item @click="logout">{{ $t('markUnread') }}</a-menu-item>
  </a-menu>
</template>

<script lang="ts">
import { deleteChat } from '@/core/api/chats'
import { createVNode, defineComponent } from '@vue/runtime-core'
import { Modal } from 'ant-design-vue'
import OffNotifyOptionsVue from './OffNotifyOptions.vue'

export default defineComponent({
  props: ['chatTitle', 'chatId'],
  methods: {
    async deleteChat() {
      await Modal.confirm({
        class: 'confirm-modal',
        centered: true,
        content: this.$t('deleteChatConfirm'),
        okText: this.$t('deleteChat'),
        cancelText: this.$t('cancel'),
        onOk: async () => {
          this.$notification.open({
            key: 'delete-noti',
            message: this.$t('deletingChat'),
            closeIcon: null,
            placement: 'bottomLeft'
          })
          await deleteChat(this.chatId)
          this.$notification.open({
            key: 'delete-noti',
            message: this.$t('deletedChat'),
            placement: 'bottomLeft'
          })
        }
      })
    },
    storeChat() {
      this.$notification.open({
        key: 'store-noti',
        message: this.$t('storingChat'),
        closeIcon: null,
        placement: 'bottomLeft'
      })
      setTimeout(() => {
        this.$notification.open({
          key: 'store-noti',
          message: this.$t('storedChat'),
          placement: 'bottomLeft'
        })
      }, 1000)
    },

    offNotify() {
      const offNotiNode = createVNode(OffNotifyOptionsVue, {
        options: [
          {
            label: this.$t('_8hours'),
            value: 8
          },
          {
            label: this.$t('aWeek'),
            value: 56
          },
          {
            label: this.$t('alwaysHidden'),
            value: 'all'
          }
        ],
        init: 8,
        change: (e) => {
          console.log(e)
        }
      })
      Modal.confirm({
        class: 'confirm-modal',
        centered: true,
        title: this.$t('offNotifyTime', { name: this.chatTitle }),
        content: offNotiNode,
        okText: this.$t('offNotification'),
        cancelText: this.$t('cancel'),
        onOk: () => {
          this.$notification.open({
            key: 'off-noti',
            message: this.$t('doingOffNotifyChat'),
            closeIcon: null,
            placement: 'bottomLeft'
          })
          setTimeout(() => {
            this.$notification.open({
              key: 'off-noti',
              message: this.$t('doneOffNotifyChat'),
              placement: 'bottomLeft'
            })
          }, 1000)
        }
      })
    },
    pinChat() {
      this.$notification.open({
        key: 'store-noti',
        message: this.$t('pinningChat'),
        closeIcon: null,
        placement: 'bottomLeft'
      })
      setTimeout(() => {
        this.$notification.open({
          key: 'store-noti',
          message: this.$t('pinnedChat'),
          placement: 'bottomLeft'
        })
      }, 1000)
    }
  }
})
</script>

<style scoped lang="scss">
</style>
