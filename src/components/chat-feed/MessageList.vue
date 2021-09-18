<template>
  <div class="message-list">
    <div class="message-list-panel scroll-element" ref="panel">
      <div v-for="(message, index) of messages" :key="message.id">
        <Timeline :message="message" :lastMessage="messages[index - 1]" />
        <template v-if="message.custom_json.type === MESSAGE_TYPE.NOTIFICATION">
          <Notification :message="message"/>
        </template>
        <Message v-else :message="message" :lastMessage="messages[index - 1]" />
      </div>
      <div id="message-bottom" ref="msgBottom"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { LOAD_STATE, MESSAGE_TYPE } from '@/core/constants'
import { Message as Msg } from '@/core/models/messages'
import { defineComponent } from '@vue/runtime-core'
import Message from './Message.vue'
import Notification from './Notification.vue'
import Timeline from './Timeline.vue'

export default defineComponent({
  components: { Message, Notification, Timeline },
  computed: {
    username(): string {
      return this.$store.getters['auth/username']
    },
    messages(): Msg[] {
      return this.$store.getters['messages/messages']
    }
  },
  data() {
    return {
      MESSAGE_TYPE: MESSAGE_TYPE
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
  padding-left: 9%;
  padding-right: 9%;
  padding-bottom: 10px;
  overflow-x: hidden;
  overflow-y: auto;
}
</style>