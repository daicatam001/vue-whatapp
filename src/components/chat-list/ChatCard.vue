<template>
  <div class="chat-card">
    <div class="thumb">
      <img src="@/assets/images/unknown-user.jpg" />
    </div>
    <div class="content">
      <div class="title">{{ chatTitle }}</div>
      <div class="last-message" v-html="lastMessageText"></div>
      <div class="last-send-time">{{ lastSendTime }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/runtime-core'
import moment from 'moment'

export default defineComponent({
  props: ['title', 'lastMessage', 'people'],
  computed: {
    username() {
      return this.$store.getters['auth/username']
    },
    lastMessageText() {
      return this.lastMessage.text
    },
    lastSendTime() {
      return moment(this.lastMessage.created).format('hh:mm')
    },
    chatTitle() {
      if (
        this.people &&
        this.people.filter((it) => it.person.username !== this.username)
          .length === 1
      ) {
        return (
          this.people[0].person.first_name +
          ' ' +
          this.people[0].person.last_name
        )
      }
      return this.title
    },
  },
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
}
.thumb {
  img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }
}
.title {
  font-size: 15px;
  font-weight: 500;
  color: rgb(37, 36, 35);
}
.last-message {
  font-size: 14px;
  color: rgb(138, 141, 145);
  /deep/ > * {
    margin-bottom: 0;
  }
}
.last-send-time {
  font-size: 14px;
  color: rgb(138, 141, 145);
  position: absolute;
  right: 20px;
  top: 7px;
}
</style>