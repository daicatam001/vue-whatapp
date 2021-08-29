<template>
  <div class="message-list">
    <div class="message-list-panel scroll-element" ref="panel">
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

<script lang="ts">
import { LOAD_STATE } from '@/core/constants'
import { Message as Msg } from '@/core/models/messages'
import { defineComponent } from '@vue/runtime-core'
import Message from './Message.vue'
import MyMessage from './MyMessage.vue'
export default defineComponent({
  components: { Message, MyMessage },
  computed: {
    username(): string {
      return this.$store.getters['auth/username']
    },
    messages(): Msg[] {
      return this.$store.getters['messages/messages']
    }
  },
  updated() {
    if (
      this.$store.getters['messages/loadState'] === LOAD_STATE.LOADING_LATEST
    ) {
      this.$refs.msgBottom.scrollIntoView()
      this.$store.dispatch('messages/setLoadState', LOAD_STATE.LOADING_LATEST)
    }
  }
})
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