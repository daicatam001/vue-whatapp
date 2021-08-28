<template>
  <div class="chat-card" :class="{ active: isActived }">
    <Avatar :src="avatar" :alt="senderName" size="50px" :text="avatarText" />
    <div class="thumb">
      <img src="@/assets/images/unknown-user.jpg" />
    </div>
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
          v-if="!!lastMessageText"
          v-html="lastMessageText"
        ></div>

        <div class="new-message-note" v-if="hasNewMessage"></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/runtime-core'
import moment from 'moment'

export default defineComponent({
  props: ['id', 'title', 'lastMessage', 'people'],
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
    lastMessageText(): string {
      return this.lastMessage.text
    },
    lastSendTime(): string {
      return moment(this.lastMessage.created).format('hh:mm')
    },
    me() {
      return this.people.find(
        (item) => item.person && item.person.username === this.username
      )
    },
    members() {
      console.log(this.people)
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
        return `${this.directUser.first_name} ${this.directUser.last_name}`
      }

      return this.title
    }
  }
})
</script>

<style scoped lang="scss">
.chat-card {
  cursor: pointer;
  padding: 10px 20px;
  display: flex;
  gap: 15px;
  position: relative;
  &:not(:last-child) {
    border-bottom: 1px solid rgb(213, 217, 222);
  }
  &:hover {
    background-color: rgba(216, 216, 216, 0.25);
  }
  &.active {
    background-color: rgba(216, 216, 216, 0.4);
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
}
.title {
  font-size: 15px;
  font-weight: 500;
  color: rgb(37, 36, 35);
}
.last-message {
  font-size: 14px;
  color: rgb(138, 141, 145);
  :deep > * {
    margin-bottom: 0;
  }
}
.line-1,
.line-2 {
  display: flex;
  align-items: center;
}
.line-2 {
  margin-top: 5px;
}
.last-send-time {
  font-size: 14px;
  color: rgb(138, 141, 145);
  margin-left: auto;
  // position: absolute;
  // right: 20px;
  // top: 7px;
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