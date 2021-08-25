<template>
  <div class="message-list">
    <div class="message-list-panel">
      <div v-for="(message, index) of messages" :key="message.id">
        <MyMessage
          v-if="message.sender_username === username"
          :message="message"
          :lastMessage="messages[index - 1]"
        />
        <template v-else>
          <Message :message="message" :lastMessage="messages[index - 1]" />
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import Message from './Message.vue'
import MyMessage from './MyMessage.vue'
export default {
  components: { Message, MyMessage },
  computed: {
    username() {
      return this.$store.getters['auth/username']
    },
    messages() {
      return this.$store.getters['messages/messages']
    }
  }
}
</script>

<style scoped lang="scss">
.message-list {
  height: 100%;
  position: relative;
}
.message-list-panel {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding: 10px 30px;
  overflow-x: hidden;
  overflow-y: auto;
}
</style>