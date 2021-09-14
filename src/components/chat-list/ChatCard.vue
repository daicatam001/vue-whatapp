<template>
  <div class="chat-card">
    <a-dropdown :trigger="['contextmenu']">
      <div class="chat-card-inner" :class="{ active: isActived }">
        <Avatar :src="avatar" size="50px" />
        <div class="content">
          <div class="line-1">
            <div class="title">{{ chatTitle }}</div>
            <div class="last-send-time" v-if="!!lastSendTime">
              {{ lastSendTime }}
            </div>
          </div>
          <div class="line-2">
            <div
              class="last-message"
              v-if="!!lastMessageTag"
              :title="lastMessageText"
            >
              <div class="wrapper">
                <div class="status">
                  <SendState :state="lastMessageState" :size="18" />
                </div>
                <div class="last-message-text" v-html="lastMessageTag"></div>
              </div>
            </div>
            <div class="unread-count" v-if="!!unreadCount && !isActived">
              {{ unreadCount }}
            </div>
            <div class="action">
              <a-dropdown :trigger="['click']">
                <a><ChevronDown /></a>
                <template #overlay>
                  <ChatSettings :chatTitle="chatTitle" />
                </template>
              </a-dropdown>
            </div>
            <!-- <div class="new-message-note" v-if="hasNewMessage"></div> -->
          </div>
        </div>
      </div>
      <template #overlay>
        <ChatSettings :chatTitle="chatTitle" />
      </template>
    </a-dropdown>
  </div>
</template>

<script lang="ts">
import { SEND_STATE } from '@/core/constants'
import { Message } from '@/core/models/messages'
import { UserInfo } from '@/core/models/users'
import ChatSettings from './ChatSettings.vue'
import { defineComponent } from '@vue/runtime-core'
import moment from 'moment'

export default defineComponent({
  components: { ChatSettings },
  props: ['id', 'title', 'lastMessage', 'people', 'avatar', 'messageEntities'],
  computed: {
    username(): string {
      return this.$store.getters['auth/username']
    },
    selectedChatId(): string {
      return this.$store.getters['chats/selectedChatId']
    },
    isActived(): boolean {
      return this.id === this.selectedChatId
    },
    lastMessageTag(): string {
      return this.lastMessage.text
        .replaceAll('<p>', '<div>')
        .replaceAll('</p>', '</div>')
    },
    lastMessageText(): string {
      return this.lastMessage.text.replaceAll('<p>', '').replaceAll('</p>', '')
    },
    lastSendTime(): string {
      const lastSent = moment(+this.lastMessage.custom_json.sending_time)
      const diff = moment().diff(lastSent, 'day')
      if (diff > 7) {
        return lastSent.format('DD-MM-YYYY')
      } else if (diff >= 1) {
        return lastSent.format('dddd')
      } else {
        return lastSent.format('hh:mm')
      }
    },
    me(): { person: UserInfo; last_read: number } {
      return this.people.find(
        (item) => item.person && item.person.username === this.username
      )
    },
    unreadCount() {
      if(!this.messageEntities){
        return 0
      }
      return (Object.values(this.messageEntities) as Message[]).filter(
        (item) =>
          !!item.id &&
          item.sender_username !== this.username &&
          item.id > this.me.last_read
      ).length
    },
    members(): { person: UserInfo; last_read: number }[] {
      return this.people.filter(
        (it) => it.person && it.person.username !== this.username
      )
    },
    directUser() {
      return this.members.length === 1 ? this.members[0].person : null
    },
    hasNewMessage(): boolean {
      if (!this.lastMessage || !this.me) {
        return false
      }
      if (
        (this.lastMessage.id && !this.me.last_read) ||
        this.lastMessage.id !== this.me.last_read
      ) {
        return true
      }
      return false
    },
    chatTitle(): string {
      if (this.directUser) {
        return `${this.directUser.first_name}`
      }

      return this.title
    },
    lastMessageState() {
      if (this.lastMessage.sender_username !== this.username) {
        return null
      }
      if (
        this.lastMessage.id &&
        this.members.every((m) => m.last_read >= this.lastMessage.id)
      ) {
        return SEND_STATE.SEEN
      } else if (
        this.lastMessage.id &&
        this.lastMessage.custom_json.state === SEND_STATE.SENDING
      ) {
        return SEND_STATE.RECEIVED
      } else {
        return this.lastMessage.custom_json.state
      }
    }
  }
})
</script>

<style scoped lang="scss">
.chat-card-inner {
  cursor: pointer;
  padding: 0 20px;
  display: flex;
  align-items: center;
  gap: 15px;
  height: 72px;
  position: relative;
  background-color: white;
  // &:not(:last-child) {
  border-bottom: 1px solid rgb(213, 217, 222);
  // }
  .action svg {
    display: none;
    margin-top: 3px;
  }
  &:hover {
    background-color: rgb(245, 245, 245);
    .action svg {
      display: block;
    }
  }
  &.active {
    background-color: #ebebeb;
  }
}
.thumb {
  img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }
}
.content {
  flex-grow: 1;
  min-width: 0;
}
.unread-count {
  padding: 0 3px;
  min-width: 20px;
  line-height: 20px;
  text-align: center;
  height: 20px;
  font-size: 12px;
  font-weight: 600;
  color: white;
  border-radius: 17px;
  background-color: #06d755;
}
.line-1 {
  display: flex;
  align-items: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.title {
  font-size: 17px;
  color: rgb(37, 36, 35);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.last-send-time {
  font-size: 12px;
  color: rgba(0, 0, 0, 0.45);
  margin-left: auto;
  white-space: nowrap;
}

.line-2 {
  display: flex;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.last-message {
  flex-grow: 1;
  font-size: 14px;
  color: rgba(0, 0, 0, 0.6);
  white-space: nowrap;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  .wrapper {
    display: flex;
    .status {
      margin-top: 2px;
      margin-right: 3px;
    }
    .last-message-text {
      white-space: nowrap;
      flex-grow: 1;
      min-width: 0;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
}

.new-message-note {
  margin-top: 5px;
  margin-left: auto;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: gray;
}
</style>