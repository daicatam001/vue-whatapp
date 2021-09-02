
<template>
  <div class="chat-feed">
    <div class="welcome-wrapper" v-if="!hasSelectedChat">
      <Welcome />
    </div>
    <template v-else>
      <div class="chat-heading-wapper">
        <ChatHeading />
      </div>
      <div class="message-list-wrapper">
        <MessageList />
      </div>
      <div class="new-message-wrapper">
        <NewMessage />
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/runtime-core'
import MessageList from './MessageList.vue'
import NewMessage from './NewMessage.vue'
import Welcome from './Welcome.vue'
import ChatHeading from './ChatHeading.vue'
export default defineComponent({
  components: {
    MessageList,
    NewMessage,
    Welcome,
    ChatHeading
  },
  computed: {
    hasSelectedChat() {
      return this.$store.getters['chats/hasSelectedChat']
    },
  }
})
</script>

<style scoped lang="scss">
.chat-feed {
  display: flex;
  height: 100%;
  flex-direction: column;
}
.welcome-wrapper {
  height: 100%;
}
.message-list-wrapper {
  flex-grow: 1;
}
.new-message-wrapper {
  flex-shrink: 0;
}
</style>