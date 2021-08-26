<template>
  <div class="message-list">
    <div class="message-list-panel" ref="panel">
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
      <div id="message-bottom" ref="msgBottom"></div>
    </div>
  </div>
</template>

<script>
import { LOAD_STATE } from '@/core/constants'
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
  },
  updated() {
    if (this.$store.getters['messages/loadState'] === LOAD_STATE.LOADING_LATEST) {
      this.$refs.msgBottom.scrollIntoView()
      this.$store.dispatch('messages/setLoadState', LOAD_STATE.LOADING_LATEST)
    }
  },
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