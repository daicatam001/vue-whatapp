<template>
  <div class="chat-card" :class="{ active: isActived }">
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
    username() {
      return this.$store.getters['auth/username']
    },
    selectedChatId() {
      return this.$store.getters['chats/selectedChatId']
    },
    isActived() {
      return this.id === this.selectedChatId
    },
    lastMessageText() {
      return this.lastMessage.text
    },
    lastSendTime() {
      return moment(this.lastMessage.created).format('hh:mm')
    },
    hasNewMessage() {
      const me = this.people.find(
        (item) => item.person && item.person.username === this.username
      )
      console.log(me)
      if (!this.lastMessage || !me) {
        return false
      }
      if (
        (this.lastMessage.id && !me.last_read) ||
        this.lastMessage.id !== me.last_read
      ) {
        return true
      }
      return false
    },
    chatTitle() {
      const member = this.people.filter(
        (it) => it.person && it.person.username !== this.username
      )
      if (member.length === 1) {
        return `${member[0].person.first_name} ${member[0].person.last_name}`
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