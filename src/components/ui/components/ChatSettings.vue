<template>
  <a-menu class="menu-settings-dropdown chat-settings">
    <a-menu-item @click="storeChat"> {{ $t('storeChat') }} </a-menu-item>
    <a-menu-item @click="offNotify">
      {{ $t('offNotification') }}
    </a-menu-item>
    <a-menu-item v-if="isDirectChat" @click="deleteChat">
      {{ $t('deleteChat') }}
    </a-menu-item>
    <a-menu-item v-if="!isDirectChat && !leftTime" @click="leaveGroup">
      {{ $t('leaveGroup') }}
    </a-menu-item>
    <a-menu-item v-if="!isDirectChat && leftTime" @click="removeGroup">
      {{ $t('removeGroup') }}
    </a-menu-item>
    <a-menu-item @click="pinChat"> {{ $t('pinChat') }} </a-menu-item>
    <a-menu-item>{{ $t('markUnread') }}</a-menu-item>
  </a-menu>
</template>

<script lang="ts">
import { deleteChat, removeChatMember, updateChat } from '@/core/api/chats'
import { MESSAGE_TYPE, NOTIFY_TYPE } from '@/core/constants'
import { createVNode, defineComponent } from '@vue/runtime-core'
import { Modal } from 'ant-design-vue'
import moment from 'moment'
import OffNotifyOptionsVue from './OffNotifyOptions.vue'

export default defineComponent({
  props: ['chatTitle', 'isDirectChat', 'chatId', 'custom_json'],
  computed: {
    username() {
      return this.$store.getters['auth/username']
    },
    leftTime() {
      try {
        return this.custom_json.leftMembers[this.username]
      } catch (e) {
        return null
      }
    }
  },
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
            closeIcon: null
          })
          await deleteChat(this.chatId)
          this.$notification.open({
            key: 'delete-noti',
            message: this.$t('deletedChat')
          })
        }
      })
    },
    storeChat() {
      this.$notification.open({
        key: 'store-noti',
        message: this.$t('storingChat'),
        closeIcon: null
      })
      setTimeout(() => {
        this.$notification.open({
          key: 'store-noti',
          message: this.$t('storedChat')
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
            closeIcon: null
          })
          setTimeout(() => {
            this.$notification.open({
              key: 'off-noti',
              message: this.$t('doneOffNotifyChat')
            })
          }, 1000)
        }
      })
    },
    pinChat() {
      this.$notification.open({
        key: 'store-noti',
        message: this.$t('pinningChat'),
        closeIcon: null
      })
      setTimeout(() => {
        this.$notification.open({
          key: 'store-noti',
          message: this.$t('pinnedChat')
        })
      }, 1000)
    },
    async leaveGroup() {
      this.$notification.open({
        key: 'leave-group',
        message: this.$t('leavingGroup')
      })
      const leftTime = moment.utc().valueOf()
      const custom_json =
        this.$store.getters['chats/chatEntities'][this.chatId].custom_json
      custom_json.leftMembers = {
        ...(custom_json.leftMembers || {}),
        [this.username]: moment.utc().valueOf()
      }
      await updateChat(this.chatId, { custom_json })
      const leaveGroupMsg = {
        text: '',
        custom_json: {
          sending_time: leftTime,
          type: MESSAGE_TYPE.NOTIFICATION,
          notify: NOTIFY_TYPE.LEAVE_GROUP
        },
        sender_username: this.username
      }
      await this.$store.dispatch('messages/sendMessage', {
        message: leaveGroupMsg,
        chatId: this.chatId
      })
      this.$notification.open({
        key: 'leave-group',
        message: this.$t('leftGroup')
      })
    },
    async removeGroup() {
    this.$notification.open({
      key: 'remove-group',
      message: this.$t('removeGroup')
    })
    await removeChatMember(this.chatId, this.username)
    this.$notification.open({
      key: 'remove-group',
      message: this.$t('removedGroup')
    })
  }
  },
  
})
</script>

<style scoped lang="scss">
</style>
