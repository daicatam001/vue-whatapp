<template>
  <div class="my-message" :id="idMessage">
    <div class="message-card">
      <div class="content">
        <div class="meta" v-if="!isSameGroupMessage">
          {{ createdFormat }}
        </div>
        <div class="body" v-html="textBody"></div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import { Message } from '@/core/models/messages'
export default {
  // props: ['id', 'text', 'created', 'senderUsername', 'lastMessage'],
  props: {
    message: Message,
    lastMessage: Message
  },
  computed: {
    isSameGroupMessage() {
      return (
        this.lastMessage &&
        this.lastMessage.sender_username === this.message.sender_username &&
        moment(this.message.created).diff(
          moment(this.lastMessage.created),
          'minute'
        ) < 5
      )
    },
    idMessage() {
      return `message-id-${this.message.id}`
    },
    textBody() {
      return this.message.text
        .replaceAll('<p>', '<div>')
        .replaceAll('</p>', '</div>')
    },
    createdFormat() {
      return moment(this.message.created).format('hh:mm')
    }
  }
}
</script>

<style scoped lang="scss">
.my-message {
  margin-bottom: 2px;
}
.message-card {
  display: flex;
  justify-content: flex-end;
  .meta {
    text-align: right;
    font-size: 12px;
    color: rgb(138, 141, 145);
  }
  .body {
    background-color: #dbf4fd;
    border-radius: 10px 0 10px 10px;
    padding: 10px;
  }
}
</style>